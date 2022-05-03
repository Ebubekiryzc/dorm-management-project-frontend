import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import TextError from "../tools/TextError";

export default function DatePickerInput(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <DateView
                id={name}
                {...field}
                {...rest}
                selected={value}
                className="form-control"
                onChange={(val) => setFieldValue(name, val)}
              />
            );
          }}
        </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
