import React from "react";
import CheckboxInput from "./checkboxInput/CheckboxInput";
import DatePickerInput from "./datePickerInput/DatePickerInput";
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
    case "date":
      return <DatePickerInput {...rest} />;
    default:
      return null;
  }
}
