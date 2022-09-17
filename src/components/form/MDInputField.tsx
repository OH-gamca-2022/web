import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";
import dynamic from "next/dynamic";
import { format } from "path";
import { useCallback, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import styles from "../../styles/github-markdown-css-dark.module.css";

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

  const customRendererOptions = useMemo(() => {
    return {
      previewRender() {
        return ReactDOMServer.renderToString(
          <ReactMarkdown className={styles.markdownBody}>
            {field.value}
          </ReactMarkdown>
        );
      },
    };
  }, []);

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel color="#ddd" htmlFor={field.name}>
        {label}
      </FormLabel>
      <SimpleMDE
        style={{ backgroundColor: "white", borderRadius: 5 }}
        onChange={onChange}
        value={field.value}
        placeholder={props.placeholder}
        options={customRendererOptions}
      />
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
