import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "../components/tools/loader/Loader";
import {
  filterStaffsByFirstName,
  filterStaffsByFullName,
  filterStaffsByLastName,
  listStaffs,
} from "../store/actions/staffActions";
import {
  Row,
  Button,
  Table,
  Col,
  FormGroup,
  InputGroup,
  FormLabel,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaFileExport } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import TextInput from "../components/tools/formikComponents/textInput/TextInput";

export default function StaffList() {
  const dispatch = useDispatch();
  const staffList = useSelector((state) => state.staffList);
  const { loading, error, staffs } = staffList;

  const initialValues = {
    query: "",
    checked: [],
  };

  useEffect(() => {
    dispatch(listStaffs());
  }, [dispatch]);

  const getFirstNameAndLastName = (query) => {
    query = query.split(" ");
    let firstName = query.slice(0, -1).join(" ");
    let lastName = query[query.length - 1];
    return { firstName, lastName };
  };

  const handleFilterStaffs = (values) => {
    let { checked, query } = values;

    if (checked.length >= 1) {
      if (checked.includes("1") && checked.includes("2")) {
        const { firstName, lastName } = getFirstNameAndLastName(query);
        dispatch(filterStaffsByFullName(firstName, lastName));
      } else if (checked.includes("1")) {
        dispatch(filterStaffsByFirstName(query));
      } else if (checked.includes("2")) {
        dispatch(filterStaffsByLastName(query));
      }
    } else {
      checked.push("1");
      checked.push("2");
      const { firstName, lastName } = getFirstNameAndLastName(query);
      dispatch(filterStaffsByFullName(firstName, lastName));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Section>
          {!staffs ? (
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
                          handleFilterStaffs(values);
                        }}
                      >
                        {(formik) => (
                          <Form className="d-flex">
                            <InputGroup className="w-50 rounded">
                              <TextInput type="search" name="query" />
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
                      <Button variant="info" className="w-100 h-100 text-light">
                        <FaFileExport className="me-2" />
                        <span>Raporla</span>
                      </Button>
                    </Col>
                    <Col className="p-0">
                      <Button
                        variant="success"
                        className="ms-auto w-100 h-100  float-end"
                      >
                        <BsFillPlusCircleFill className="me-2" />
                        <span>Görevli Ekle</span>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {staffs.length >= 1 ? (
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
                      <th>Ad</th>
                      <th>Soyad</th>
                      <th>Cinsiyet</th>
                      <th>İşe Başlama Tarihi</th>
                      <th>İzin Limiti</th>
                      <th>Maaş</th>
                      <th>Düzenle</th>
                      <th>Sil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffs.map((staff, index) => (
                      <tr key={index}>
                        <td className="d-none">{staff.id}</td>
                        <td>{staff.firstName}</td>
                        <td>{staff.lastName}</td>
                        <td>{staff.genderName}</td>
                        <td>{staff.dateOfStart}</td>
                        <td>{staff.dayOffLimit}</td>
                        <td>{staff.salary}</td>
                        <td>
                          <Button variant="warning" className="text-light">
                            <AiFillEdit />
                          </Button>
                        </td>
                        <td>
                          <Button variant="danger" className="text-light">
                            <RiDeleteBin6Line />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <span>Eşleşen bir kayıt bulunamadı.</span>
              )}
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

  .page-link {
    background: #121212;
    color: #c8e7ff;
    border: none;
    &:hover {
      transform: scale(1.2);
      background: #c8e7ff;
      color: #121212;
      transition: 300ms all ease;
    }
  }
`;
