import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/react";
import { useField } from "formik";
import React, { useCallback, useEffect } from "react";

type SelectInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  children: React.ReactNode;
};

export const SelectInputField: React.FC<SelectInputFieldProps> = ({
  name,
  label,
  size: _,
  children,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      helpers.setValue(event.target.value);
    },
    []
  );
  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel color="#ddd" htmlFor={field.name}>
        {label}
      </FormLabel>
      <Select
        borderColor={"#30363d"}
        onChange={onChange}
        value={field.value}
        placeholder={props.placeholder}
      >
        {children}
      </Select>
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
