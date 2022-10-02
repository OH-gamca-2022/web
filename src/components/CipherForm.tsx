import { Flex, Button, Box, Heading } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";
import {
  AnswerFragment,
  useGetAllAnswersQuery,
  useGetCipherQuery,
  useSaveCipherMutation,
} from "../generated/graphql";
import { dateToString } from "../utils/dateFormatter";
import { InputField } from "./form/InputField";

interface CipherFormProps {
  id?: string;
}

type ClassInfo = {
  className: string;
  numberOfAttempts: number;
  lastAttemptTime: Date;
  hasCorrectAnswer: boolean;
};

export const CipherForm: React.FC<CipherFormProps> = ({ id }) => {
  const router = useRouter();
  const [, saveCipher] = useSaveCipherMutation();
  const [{ data, fetching }] = useGetCipherQuery({
    pause: !id,
    variables: { id: id as string },
  });
  const [{ data: answers }] = useGetAllAnswersQuery();

  useEffect(() => {
    console.log("classinfos", getClassInfos(), !answers && Boolean(id));
  });

  const getClassInfos: () => ClassInfo[] = () => {
    const groupedAnswers = answers?.getAllAnswers
      .filter((item) => item.cipherId == id)
      .reduce((group, answer) => {
        const existingClassIndex = group.findIndex(
          (item) => item.className == answer.className
        );
        if (existingClassIndex !== -1) {
          group[existingClassIndex].answers.push(answer);
        } else {
          group.push({
            className: answer.className,
            answers: [answer],
          });
        }
        return group;
      }, [] as { className: string; answers: AnswerFragment[] }[]);
    console.log(groupedAnswers);
    return (
      groupedAnswers?.map((item, index) => {
        const itemAnswers = [...item.answers];
        const lastAnswer = itemAnswers.sort((a, b) => {
          return dayjs(b.time).diff(dayjs(a.time), "second");
        })[0];
        console.log(lastAnswer.time);
        return {
          className: item.className,
          numberOfAttempts: item.answers.length,
          lastAttemptTime: lastAnswer.time as Date,
          hasCorrectAnswer: lastAnswer.correct,
        };
      }) || []
    );
  };

  if (!answers && id) {
    return <Heading>Loading...</Heading>;
  }

  const columns: TableColumn<ClassInfo>[] = [
    {
      name: "Trieda",
      selector: (row) => row.className,
    },
    { name: "Počet pokusov", selector: (row) => row.numberOfAttempts },
    {
      name: "Posledný pokus",
      selector: (row) =>
        dateToString(dayjs(row.lastAttemptTime).toDate(), true),
    },
    {
      name: "Správna odpoveď",
      selector: (row) => (row.hasCorrectAnswer ? "Áno" : "Nie"),
    },
  ];

  if (fetching) {
    return <Heading>Loading...</Heading>;
  }

  createTheme("myDark", {
    text: {
      primary: "#bbb",
      secondary: "#2aa198",
    },
    background: {
      default: "#040f1a",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#30363d",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });
  return (
    <Box>
      <Formik
        initialValues={{
          name: data?.getCipher.name || "",
          correctAnswer: data?.getCipher.correctAnswer || "",
          fileLink: data?.getCipher.fileLink || "",
        }}
        onSubmit={async (values) => {
          const result = await saveCipher({
            id: data?.getCipher.id || undefined,
            name: values.name,
            correctAnswer: values.correctAnswer,
            published: data?.getCipher.published || false,
            fileLink: values.fileLink,
          });
          if (result.error) {
            console.log(result.error);
          } else {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="name" placeholder="názov" label="Názov" />
            <Box mt={4}>
              <InputField
                name="correctAnswer"
                placeholder="správna odpoveď"
                label="Správna odpoveď"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="fileLink"
                placeholder="link na zadania"
                label="Link na zadania"
              />
            </Box>
            <Flex justifyContent="flex-end" mb={10}>
              <Button mt={4} isLoading={isSubmitting} type="submit">
                Uložiť
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      <DataTable
        style={{ backgroundColor: "#040f1a" }}
        columns={columns}
        data={getClassInfos()}
        responsive={false}
        theme="myDark"
      />
    </Box>
  );
};
