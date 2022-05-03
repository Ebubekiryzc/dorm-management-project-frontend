import React, { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCalendar2PlusFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import styled from "styled-components";
import Loader from "../../components/tools/loader/Loader";
import {
  listDayOffsWithRole,
  listUserDayOffs,
} from "../../store/actions/dayOffActions";

// TODO: dayOffActions'da role göre getirme olması gerekiyor.
export default function DayOffList(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingUserInfo, userInfo } = userLogin;

  const dayOffList = useSelector((state) => state.dayOffList);
  const { loading: loadingDayOffList, dayOffs } = dayOffList;

  const userDayOffList = useSelector((state) => state.userDayOffList);
  const { loading: loadingUserDayOffList, dayOffs: userDayOffs } =
    userDayOffList;

  useEffect(() => {
    if (userInfo) {
      let jwtData = userInfo.split(".")[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      const roles = decodedJwtData.roles;
      let role = "student";

      if (roles.include("admin")) {
        role = "admin";
      } else if (roles.include("staff")) {
        role = "staff";
      }

      if (role === "student") {
        dispatch(listUserDayOffs());
      } else {
        dispatch(listDayOffsWithRole(role));
      }
    }
  }, [userInfo, dispatch]);

  return loadingUserInfo && loadingDayOffList && loadingUserDayOffList ? (
    <Loader />
  ) : (
    <Section>
      {loadingDelete && <Loader />}
      {loadingUpdate && <Loader />}
      {!dayOffs ? (
        error
      ) : (
        <div>
          <Row className="d-flex ms-auto me-auto mb-3 align-items-end">
            <Col className="px-auto">
              <Row>
                <Col className="p-0">
                  <Button
                    variant="success"
                    className="ms-auto w-100 h-100  float-end"
                    onClick={props.handleStateInsertForm}
                  >
                    <BsFillCalendar2PlusFill className="me-2" />
                    <span>İzin Ekle</span>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          {dayOffs.length >= 1 ? (
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
                  <th>Başlangıç Tarihi</th>
                  <th>Bitiş Tarihi</th>
                  <th>Sil</th>
                </tr>
              </thead>
              <tbody>
                {dayOffs.map((dayOff, index) => (
                  <tr key={index}>
                    <td className="d-none">{dayOff.id}</td>
                    <td>{dayOff.firstName}</td>
                    <td>{dayOff.lastName}</td>
                    <td>{dayOff.dateOfStart}</td>
                    <td>{dayOff.dateOfEnd}</td>
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
        </div>
      )}
    </Section>
  );
}

const Section = styled.section``;
