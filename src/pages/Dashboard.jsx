import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Main from "./Main";
import StudentList from "./StudentList/StudentList";
import StaffList from "./StaffList";

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
    }
  }, [userInfo, history, dispatch]);

  return (
    <Section>
      <Navbar />
      <Route exact path="/dashboard" component={Main} />
      <Route path="/dashboard/students" component={StudentList} />
      <Route path="/dashboard/staffs" component={StaffList} />
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
  }
`;
