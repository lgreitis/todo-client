import { css } from "@emotion/react";
import { Input, Text } from "@geist-ui/core";
import { FieldProps } from "formik";

interface Props {
  scale?: number;
  width?: string | number;
  placeholder?: string;
}

const CustomInput = (props: FieldProps & Props) => {
  const {
    field,
    form: { touched, errors },
    scale,
    width,
    placeholder,
  } = props;

  const hasError = touched[field.name] && errors[field.name] ? true : false;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: left;
      `}
    >
      <Input.Password
        type={hasError ? "error" : "default"}
        scale={scale}
        width={width}
        placeholder={placeholder}
        {...field}
      ></Input.Password>
      <Text
        span
        small
        type="error"
        css={css`
          text-align: left;
        `}
      >
        {hasError && errors[field.name]?.toString()}
      </Text>
    </div>
  );
};

export default CustomInput;
