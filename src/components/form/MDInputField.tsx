import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Field, useField } from "formik";
import dynamic from "next/dynamic";
import { format } from "path";
import { useCallback, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../styles/github-markdown-css-dark.module.css";
import { Card } from "../Card";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type MDInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const MDInputField: React.FC<MDInputFieldProps> = ({
  label,
  name,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const onChange = useCallback((value: string) => {
    helpers.setValue(value);
  }, []);

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel color="#ddd" htmlFor={field.name}>
        {label}
      </FormLabel>
      <Tabs borderColor={"#30363d"} bgColor={"#040f1a"}>
        <TabList>
          <Tab color={"#30363d"}>Editor</Tab>
          <Tab color={"#30363d"}>Náhľad</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleMDE
              style={{ backgroundColor: "white", borderRadius: 5 }}
              onChange={onChange}
              value={field.value}
              placeholder={props.placeholder}
            />
          </TabPanel>
          <TabPanel>
            <Card>
              <ReactMarkdown
                className={styles.markdownBody}
                remarkPlugins={[remarkGfm]}
              >
                {field.value}
              </ReactMarkdown>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
