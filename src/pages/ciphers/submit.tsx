import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  Icon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Layout } from "../../components/Layout";
import { LoadingScreen } from "../../components/LoadingScreen";
import {
  CipherFragment,
  useAnswerMutation,
  useGetAnswersOfMyClassQuery,
  useGetCiphersQuery,
} from "../../generated/graphql";

const submit: NextPage = () => {
  const [{ data: ciphers }] = useGetCiphersQuery();
  const [, answer] = useAnswerMutation();
  const [{ data: answers }] = useGetAnswersOfMyClassQuery();
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [manyAnswers, setManyAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    if (ciphers) {
      if (currentAnswers.length == 0 || !currentAnswers) {
        setCurrentAnswers(Array(ciphers.getCiphers.length).fill(""));
        setManyAnswers(Array(ciphers.getCiphers.length).fill(false));
      }
    }
  }, [ciphers]);

  useEffect(() => {
    console.log(answers);
  });

  const hasAnsweredCorrect = (cipher: CipherFragment) => {
    const filteredAnswers = answers?.getAnswersOfMyClass.filter(
      (item, index) => {
        return item.cipherId == cipher.id;
      }
    );
    const result = filteredAnswers?.some((item) => {
      return item.correct;
    });
    return result;
  };

  const canAnswer = (cipher: CipherFragment) => {
    if (!answersOfCipher(cipher) || answersOfCipher(cipher)?.length == 0) {
      return true;
    } else {
      return dayjs().isAfter(dayjs(timeOfNextAnswer(cipher)));
    }
  };

  const answersOfCipher = (cipher: CipherFragment) => {
    const cipherAnswers = answers?.getAnswersOfMyClass.filter((item, index) => {
      return item.cipherId == cipher.id;
    });
    return cipherAnswers;
  };

  const timeOfNextAnswer = (cipher: CipherFragment) => {
    const cipherAnswers = answersOfCipher(cipher);
    const lastAnswer = cipherAnswers?.sort((a, b) => {
      return dayjs(b.time).diff(dayjs(a.time), "second");
    })[0];
    if (lastAnswer) {
      return dayjs(lastAnswer.time)
        .add(15 * (cipherAnswers?.length || 0), "minute")
        .toDate();
    } else {
      return dayjs();
    }
  };

  if (!ciphers) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <Stack divider={<Divider borderColor={"#30363d"} />}>
        {ciphers?.getCiphers.map((cipher, index) => (
          <Box key={index}>
            <Link href={cipher.fileLink}>
              <Heading color="#ccc">{cipher.name}</Heading>
            </Link>
            <Flex mt={4}>
              <Input
                isDisabled={hasAnsweredCorrect(cipher) || !canAnswer(cipher)}
                placeholder="odpoveď"
                borderColor="#30363d"
                color="#ccc"
                mr={4}
                value={currentAnswers[index] || ""}
                onChange={(e) => {
                  setCurrentAnswers(
                    currentAnswers?.map((item, answerIndex) => {
                      if (answerIndex == index) {
                        return e.target.value;
                      } else {
                        return item;
                      }
                    })
                  );
                }}
              />
              <Button
                isDisabled={hasAnsweredCorrect(cipher) || !canAnswer(cipher)}
                bgColor={"#1c2133"}
                color="#ccc"
                onClick={() => {
                  console.log(currentAnswers);
                  answer({
                    cipherId: cipher.id,
                    answer: currentAnswers[index],
                  });
                  setCurrentAnswers(
                    currentAnswers?.map((item, answerIndex) => {
                      if (answerIndex == index) {
                        return "";
                      } else {
                        return item;
                      }
                    })
                  );
                }}
              >
                Odovzdať
              </Button>
            </Flex>
            {!canAnswer(cipher) && !hasAnsweredCorrect(cipher) && (
              <Text m={1} color="#718096">{`Môžete odpovedať za ${dayjs(
                timeOfNextAnswer(cipher)
              ).diff(dayjs(), "minutes")} minút`}</Text>
            )}
            {answersOfCipher(cipher) && answersOfCipher(cipher)?.length !== 0 && (
              <Box mt={4}>
                {answersOfCipher(cipher)
                  ?.sort((a, b) => {
                    return dayjs(b.time).diff(dayjs(a.time), "second");
                  })
                  .slice(0, manyAnswers[index] ? undefined : 1)
                  .map((answer, answerIndex) => (
                    <Flex
                      padding={1}
                      paddingX={2}
                      mt={2}
                      key={answerIndex}
                      borderColor={answer.correct ? "#478244" : "#824444"}
                      bgColor={answer.correct ? "#40553f" : "#553f3f"}
                      borderWidth={1}
                      borderRadius={10}
                      alignItems="center"
                    >
                      {answer.correct ? (
                        <CheckIcon color="green" mr={2} boxSize={4} />
                      ) : (
                        <CloseIcon color="#d12222" mr={2} boxSize={3} />
                      )}
                      <Text color="#ccc">{`${
                        answer.correct ? "Správna " : "Nesprávna "
                      }odpoveď: ${answer.answer}`}</Text>
                    </Flex>
                  ))}
                <Flex alignItems={"center"}>
                  <Button
                    leftIcon={
                      manyAnswers[index] ? (
                        <ChevronUpIcon boxSize={6} />
                      ) : (
                        <ChevronDownIcon boxSize={6} />
                      )
                    }
                    iconSpacing={0}
                    variant={"link"}
                    margin={2}
                    onClick={() => {
                      setManyAnswers(
                        manyAnswers.map((item, arrayIndex) => {
                          if (arrayIndex == index) {
                            return !item;
                          } else {
                            return item;
                          }
                        })
                      );
                    }}
                  >
                    {manyAnswers[index] ? "Menej odpovedí" : "Viac odpovedí"}
                  </Button>
                </Flex>
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Layout>
  );
};

export default submit;
