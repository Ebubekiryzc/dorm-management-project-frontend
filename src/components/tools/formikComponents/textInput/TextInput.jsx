import { useField } from "formik";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import "./TextInput.css";
import React from "react";

export default function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return label ? (
    <FormGroup className="form-group">
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <FormControl {...props} {...field} />
      {meta.touched && !!meta.error ? (
        <FormLabel className="error">{meta.error}</FormLabel>
      ) : null}
    </FormGroup>
  ) : (
    <FormControl {...props} {...field} />
  );
}
