import React from "react";
import CheckboxInput from "./checkboxInput/CheckboxInput";
import RadioButtons from "./RadioButtons";
import SelectInput from "./selectInput/SelectInput";
import TextInput from "./textInput/TextInput";

export default function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <TextInput {...rest} />;
    case "select":
      return <SelectInput {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxInput {...rest} />;
    default:
      return null;
  }
}
