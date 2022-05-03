import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "../../components/tools/loader/Loader";
import * as yup from "yup";
import {
  deleteStudent,
  exportStudents,
  filterStudentsByFirstName,
  filterStudentsByFullName,
  filterStudentsByLastName,
  listStudents,
  updateStudent,
} from "../../store/actions/studentActions";

import { listGenders } from "../../store/actions/genderActions";
import {
  Row,
  Button,
  Table,
  Col,
  FormGroup,
  InputGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFileExport } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./studentList.css";
import FormikControl from "../../components/tools/formikComponents/FormikControl";
import { listDepartments } from "../../store/actions/departmentActions";
import { getClaimByName } from "../../store/actions/operationClaimActions";
import { registerStudent } from "../../store/actions/authActions";

export default function StudentList() {
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;

  const genderList = useSelector((state) => state.genderList);
  const { genders } = genderList;

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const operationClaimList = useSelector((state) => state.operationClaimList);
  const { operationClaims } = operationClaimList;

  const studentReport = useSelector((state) => state.studentReport);
  const { message } = studentReport;

  const studentDelete = useSelector((state) => state.studentDelete);
  const { loading: loadingDelete } = studentDelete;

  const studentUpdate = useSelector((state) => state.studentUpdate);
  const { loading: loadingUpdate } = studentUpdate;

  const [showInsertForm, setShowInsertForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});

  const handleClose = () => {
    setShowInsertForm(false);
    handleCloseUpdateForm();
    handleCloseDeleteForm();
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleCloseDeleteForm = () => {
    setShowDeleteForm(false);
  };

  const handleShowInsertForm = () => setShowInsertForm(true);

  const handleShowUpdateForm = (student) => {
    setCurrentStudent(student);
    setShowUpdateForm(true);
  };
  const handleShowDeleteForm = (student) => {
    setCurrentStudent(student);
    setShowDeleteForm(true);
  };

  const handleSubmitDeleteStudent = () => {
    const student = {
      individualUserId: currentStudent.id,
      departmentId: currentStudent.departmentName,
      dateOfEntry: currentStudent.dateOfEntry,
      blockCode: currentStudent.blockCode,
      roomNumber: currentStudent.roomNumber,
    };
    dispatch(deleteStudent(student));
    setTimeout(() => {
      dispatch(listStudents());
    }, 500);
    setShowDeleteForm(false);
  };

  const handleSubmitUpdateStudent = (
    firstName,
    lastName,
    genderName,
    departmentName,
    dayOffLimit,
    blockCode,
    roomNumber,
    password
  ) => {
    const currentDateOfEntry = new Date(currentStudent.dateOfEntry);
    const studentRegisterDto = {
      individualUserRegisterDto: {
        authenticateUserDTO: {
          username: currentStudent.username.toLocaleLowerCase("tr-TR"),
          password: password.toLocaleLowerCase("tr-TR"),
        },
        genderName: genderName,
        firstName: firstName,
        lastName: lastName,
        dayOffLimit: dayOffLimit,
      },
      facultyId: "1",
      departmentName: departmentName,
      roles: [operationClaims],
      dateOfEntry: `${currentDateOfEntry.getDate()}-${
        currentDateOfEntry.getMonth() + 1
      }-${currentDateOfEntry.getFullYear()}`,
      blockCode: blockCode,
      roomNumber: roomNumber,
    };
    console.log(studentRegisterDto);
    dispatch(updateStudent(studentRegisterDto));
    setTimeout(() => {
      dispatch(listStudents());
    }, 500);
    setShowUpdateForm(false);
  };

  const handleSubmitAddStudent = (
    username,
    firstName,
    lastName,
    genderName,
    facultyId,
    departmentName,
    dayOffLimit,
    blockCode,
    roomNumber
  ) => {
    const today = new Date();
    const studentRegisterDto = {
      individualUserRegisterDto: {
        authenticateUserDTO: {
          username: username.trim().toLocaleLowerCase("tr-TR"),
          password: firstName
            .toLocaleLowerCase("tr-TR")
            .trim()
            .concat(lastName.toLocaleLowerCase("tr-TR").trim()),
        },
        genderName: genderName,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dayOffLimit: dayOffLimit,
      },
      facultyId: facultyId,
      departmentName: departmentName,
      roles: [operationClaims],
      dateOfEntry: `${today.getDate()}-${
        today.getMonth() + 1
      }-${today.getFullYear()}`,
      blockCode: blockCode.trim(),
      roomNumber: roomNumber,
    };
    dispatch(registerStudent(studentRegisterDto));
    setTimeout(() => {
      dispatch(listStudents());
    }, 500);
    setShowInsertForm(false);
  };

  const initialValuesForInsert = {
    username: "",
    genderName: "Erkek",
    firstName: "",
    lastName: "",
    dayOffLimit: "",
    facultyId: "1",
    departmentName: "Bilgisayar Mühendisliği",
    blockCode: "",
    roomNumber: "",
  };

  const schemaInsert = yup.object({
    username: yup.string().required("Kullanıcı adı boş bırakılmamalı"),
    firstName: yup.string().required("Ad boş bırakılmamalı"),
    lastName: yup.string().required("Soyad boş bırakılmamalı"),
    genderName: yup.string().required("Cinsiyet boş bırakılmamalı"),
    departmentName: yup.string().required("Bölümü boş bırakılmamalı"),
    dayOffLimit: yup.number().required("İzin sayısı boş bırakılmamalı"),
    blockCode: yup.string().required("Blok kodu boş bırakılmamalı"),
    roomNumber: yup
      .number("Lütfen sayı giriniz")
      .required("Oda numarası boş bırakılmamalı"),
  });

  const initialValuesForUpdate = {
    username: currentStudent.username,
    genderName: currentStudent.genderName,
    firstName: currentStudent.firstName,
    lastName: currentStudent.lastName,
    dayOffLimit: currentStudent.dayOffLimit,
    facultyId: currentStudent.facultyId,
    departmentName: currentStudent.departmentName,
    blockCode: currentStudent.blockCode,
    roomNumber: currentStudent.roomNumber,
    password: "",
  };

  const schemaUpdate = yup.object({
    firstName: yup.string().required("Ad boş bırakılmamalı"),
    lastName: yup.string().required("Soyad boş bırakılmamalı"),
    genderName: yup.string().required("Cinsiyet boş bırakılmamalı"),
    departmentName: yup.string().required("Bölümü boş bırakılmamalı"),
    dayOffLimit: yup.number().required("İzin sayısı boş bırakılmamalı"),
    blockCode: yup.string().required("Blok kodu boş bırakılmamalı"),
    roomNumber: yup
      .number("Lütfen sayı giriniz")
      .required("Oda numarası boş bırakılmamalı"),
    password: yup.string(),
  });

  const initialValues = {
    query: "",
    checked: [],
  };

  useEffect(() => {
    dispatch(listStudents());
    dispatch(listGenders());
    dispatch(listDepartments());
    dispatch(getClaimByName("student"));
  }, [dispatch]);

  const getFirstNameAndLastName = (query) => {
    query = query.split(" ");
    let firstName = query.slice(0, -1).join(" ");
    let lastName = query[query.length - 1];
    return { firstName, lastName };
  };

  //TODO: lastname yanlış atanıyor. Bunu bir kontrol etmelisin.
  const handleFilterStudents = (values) => {
    let { checked, query } = values;

    if (checked.length >= 1) {
      if (checked.includes("1") && checked.includes("2")) {
        const { firstName, lastName } = getFirstNameAndLastName(query);
        dispatch(filterStudentsByFullName(firstName, lastName));
      } else if (checked.includes("1")) {
        dispatch(filterStudentsByFirstName(query));
      } else if (checked.includes("2")) {
        dispatch(filterStudentsByLastName(query));
      }
    } else {
      dispatch(filterStudentsByFirstName(query));
      checked.push("1");
    }
  };

  const exportReport = () => {
    dispatch(exportStudents());
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Section>
          {loadingDelete && <Loader />}
          {loadingUpdate && <Loader />}
          {!students ? (
            error
          ) : (
            <div>
              <Row className="d-flex ms-auto me-auto mb-3 align-items-end">
                <Col className="ps-0" sm="9">
                  <Row>
                    <Col>
                      <Formik
                        initialValues={initialValues}
                        onSubmit={async (values) => {
                          handleFilterStudents(values);
                        }}
                      >
                        {(formik) => (
                          <Form className="d-flex">
                            <InputGroup className="w-50 rounded">
                              <FormikControl
                                type="search"
                                name="query"
                                control="input"
                              />
                              <Button
                                type="submit"
                                className="px-4"
                                variant="outline-primary"
                              >
                                <FaSearch className="text-blue" />
                              </Button>
                            </InputGroup>
                            <FormGroup className="d-flex ms-3">
                              <Field
                                className="form-check-input"
                                type="checkbox"
                                name="checked"
                                value="1"
                                id="firstNameCheckBox"
                              />
                              <FormLabel
                                className="ms-2"
                                htmlFor="firstNameCheckBox"
                              >
                                Ad
                              </FormLabel>
                            </FormGroup>
                            <FormGroup className="d-flex ms-4">
                              <Field
                                className="form-check-input"
                                type="checkbox"
                                name="checked"
                                value="2"
                                id="lastNameCheckBox"
                              />
                              <FormLabel
                                className="ms-2"
                                htmlFor="lastNameCheckBox"
                              >
                                Soyad
                              </FormLabel>
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </Col>
                  </Row>
                </Col>
                <Col className="px-auto">
                  <Row>
                    <Col className="p-0 me-4">
                      <Button
                        variant="info"
                        className="w-100 h-100 text-light"
                        onClick={exportReport}
                      >
                        <FaFileExport className="me-2" />
                        <span>Raporla</span>
                      </Button>
                    </Col>
                    <Col className="p-0">
                      <Button
                        variant="success"
                        className="ms-auto w-100 h-100  float-end"
                        onClick={handleShowInsertForm}
                      >
                        <BsFillPlusCircleFill className="me-2" />
                        <span>Öğrenci Ekle</span>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {students.length >= 1 ? (
                <Table
                  variant="dark"
                  striped
                  hover
                  className="text-center"
                  responsive="sm"
                >
                  <thead>
                    <tr>
                      <th className="d-none">Id</th>
                      <th>Kullanıcı Adı</th>
                      <th>Ad</th>
                      <th>Soyad</th>
                      <th>Cinsiyet</th>
                      <th>Kayıt Tarihi</th>
                      <th>İzin Limiti</th>
                      <th>Bölümü</th>
                      <th>Blok</th>
                      <th>Oda No</th>
                      <th>Düzenle</th>
                      <th>Sil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={index}>
                        <td className="d-none">{student.id}</td>
                        <td>{student.username}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.genderName}</td>
                        <td>{student.dateOfEntry}</td>
                        <td>{student.dayOffLimit}</td>
                        <td>{student.departmentName}</td>
                        <td>{student.blockCode}</td>
                        <td>{student.roomNumber}</td>
                        <td>
                          <Button
                            variant="warning"
                            className="text-light"
                            onClick={() => handleShowUpdateForm(student)}
                          >
                            <AiFillEdit />
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            className="text-light"
                            onClick={() => handleShowDeleteForm(student)}
                          >
                            <RiDeleteBin6Line />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <span>Herhangi bir kayıt bulunamadı.</span>
              )}

              <Modal
                show={showInsertForm}
                onHide={handleClose}
                dialogClassName="insert-form"
              >
                <Modal.Header>
                  <Modal.Title className="mx-auto text-center">
                    Öğrenci Ekle
                  </Modal.Title>
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
                    initialValues={initialValuesForInsert}
                    validationSchema={schemaInsert}
                    onSubmit={(values) =>
                      handleSubmitAddStudent(
                        values.username,
                        values.firstName,
                        values.lastName,
                        values.genderName,
                        values.facultyId,
                        values.departmentName,
                        values.dayOffLimit,
                        values.blockCode,
                        values.roomNumber
                      )
                    }
                  >
                    {(formik) => (
                      <Form>
                        <FormikControl
                          name="username"
                          label="Kullanıcı Adı"
                          control="input"
                        />
                        <FormikControl
                          name="firstName"
                          label="Adı"
                          control="input"
                        />
                        <FormikControl
                          name="lastName"
                          label="Soyadı"
                          control="input"
                        />
                        <FormikControl
                          name="genderName"
                          label="Cinsiyet"
                          options={genders}
                          control="radio"
                        />
                        <FormikControl
                          name="departmentName"
                          label="Bölüm"
                          options={departments}
                          control="select"
                        />
                        <FormikControl
                          name="dayOffLimit"
                          label="İzin Sayısı"
                          control="input"
                          type="number"
                        />
                        <FormikControl
                          name="blockCode"
                          label="Blok"
                          control="input"
                        />
                        <FormikControl
                          name="roomNumber"
                          label="Oda Numarası"
                          control="input"
                          type="number"
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

              <Modal
                show={showUpdateForm}
                onHide={handleClose}
                dialogClassName="insert-form"
              >
                <Modal.Header>
                  <Modal.Title className="mx-auto text-center">
                    Öğrenci Güncelle
                  </Modal.Title>
                  <Button
                    className="align-self-end"
                    variant="outline-warning"
                    aria-label="Close"
                    onClick={handleClose}
                  >
                    X
                  </Button>
                </Modal.Header>
                <Modal.Body>
                  <Formik
                    enableReinitialize
                    initialValues={initialValuesForUpdate}
                    validationSchema={schemaUpdate}
                    onSubmit={(values) =>
                      handleSubmitUpdateStudent(
                        values.firstName,
                        values.lastName,
                        values.genderName,
                        values.departmentName,
                        values.dayOffLimit,
                        values.blockCode,
                        values.roomNumber,
                        values.password
                      )
                    }
                  >
                    {(formik) => (
                      <Form>
                        <FormikControl
                          name="username"
                          label="Kullanıcı Adı"
                          control="input"
                          className="disabled"
                          disabled
                        />
                        <FormikControl
                          name="firstName"
                          label="Adı"
                          control="input"
                        />
                        <FormikControl
                          name="lastName"
                          label="Soyadı"
                          control="input"
                        />
                        <FormikControl
                          name="genderName"
                          label="Cinsiyet"
                          options={genders}
                          control="radio"
                        />
                        <FormikControl
                          name="departmentName"
                          label="Bölüm"
                          options={departments}
                          control="select"
                        />
                        <FormikControl
                          name="dayOffLimit"
                          label="İzin Sayısı"
                          control="input"
                          type="number"
                        />
                        <FormikControl
                          name="blockCode"
                          label="Blok"
                          control="input"
                        />
                        <FormikControl
                          name="roomNumber"
                          label="Oda Numarası"
                          control="input"
                          type="number"
                        />
                        <hr />
                        <FormikControl
                          name="password"
                          label="Parola"
                          control="input"
                          type="password"
                          placeholder="Yeni parola"
                        />
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <Button
                            className="text-light mt-4"
                            variant="warning"
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
              <Modal show={showDeleteForm} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Emin misiniz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {currentStudent.firstName} öğrencisinin kaydını silmek
                  istediğinizden emin misiniz?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    İptal
                  </Button>
                  <Button variant="danger" onClick={handleSubmitDeleteStudent}>
                    Sil
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        </Section>
      )}
    </>
  );
}

const Section = styled.section`
  margin-top: 2.5rem;
  color: #ffffff;
  font-size: 1.3rem;
  .form-control {
    color: #c8e7ff;
    &:focus {
      background-color: #121212;
    }
  }

  button {
    font-size: 1.1rem;
  }
  table {
    thead {
      color: #c8e7ff;
    }
    tbody {
      color: #ffffff;
      td {
        button {
          font-size: 1.2rem;
        }
      }
    }
  }
`;
