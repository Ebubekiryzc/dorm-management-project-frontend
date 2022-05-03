import { Form, Formik } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createDayOff } from "../store/actions/dayOffActions";
import FormikControl from "./tools/formikComponents/FormikControl";
import * as yup from "yup";
import Loader from "./tools/loader/Loader";

export default function CreateDayOff(props) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, userDetail } = userDetails;

  const handleClose = () => {
    props.handleState(false);
  };

  const handleCreateDayOff = (dateOfStart, dateOfEnd) => {
    const dayOff = {
      id: 0,
      userId: props.userId ? props.userId : userDetail.userId,
      dateOfStart: `${dateOfStart.getDate()}-${
        dateOfStart.getMonth() + 1
      }-${dateOfStart.getFullYear()}`,
      dateOfEnd: `${dateOfEnd.getDate()}-${
        dateOfEnd.getMonth() + 1
      }-${dateOfStart.getFullYear()}`,
    };
    dispatch(createDayOff(dayOff));
    handleClose()
  };

  const initialValues = {
    dateOfStart: "",
    dateOfEnd: "",
  };

  const schema = yup.object({
    dateOfStart: yup.string().required("Başlangıç tarihi boş bırakılmamalı"),
    dateOfEnd: yup.string().required("Bitiş tarihi boş bırakılmamalı"),
  });

  return loading ? (
    <Loader />
  ) : (
    <Modal
      show={props.showState}
      onHide={handleClose}
      dialogClassName="insert-form"
    >
      <Modal.Header>
        <Modal.Title className="mx-auto text-center">İzin Al</Modal.Title>
        <Button
          className="align-self-end"
          variant="outline-success"
          aria-label="Close"
          onClick={handleClose}
        >
          X
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) =>
            handleCreateDayOff(values.dateOfStart, values.dateOfEnd)
          }
        >
          {(formik) => (
            <Form>
              <FormikControl
                name="dateOfStart"
                label="Başlangıç Tarihi"
                control="date"
                dateFormat="yyyy-MM-dd"
                minDate={Date.now()}
              />
              <FormikControl
                name="dateOfEnd"
                label="Bitiş Tarihi"
                control="date"
                dateFormat="yyyy-MM-dd"
                minDate={Date.now() + 3600 * 1000 * 24}
              />
              <div className="d-flex flex-column align-items-center justify-content-center">
                <Button
                  className="text-light mt-4"
                  variant="success"
                  as="input"
                  type="submit"
                  value="Kaydet"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
