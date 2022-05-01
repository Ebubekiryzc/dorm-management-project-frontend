import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./tools/TextError";

export default function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="d-flex flex-row">
        <Field name={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <div className="form-check form-check-inline" key={option.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={option.id}
                    {...field}
                    value={option.id}
                    checked={field.value == option.id}
                  />
                  <label htmlFor={option.id}>{option.name}</label>
                </div>
              );
            });
          }}
        </Field>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
