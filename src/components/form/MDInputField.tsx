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
import styles from "../../styles/github-markdown-css.module.css";

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
          <ReactMarkdown
            children={field.value}
            className={styles.markdownBody}
          />
        );
      },
    };
  }, []);

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <SimpleMDE
        onChange={onChange}
        value={field.value}
        placeholder={props.placeholder}
        options={customRendererOptions}
      />
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
