import React from "react";
import { ErrorMessage, Field } from "formik";
import TextError from "../tools/TextError";

export default function SelectInput(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className="form-select bg-dark text-light"
      >
        {options.map((option) => {
          return (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
