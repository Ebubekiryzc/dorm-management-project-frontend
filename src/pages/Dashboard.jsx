import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Main from "./Main";
import StudentList from "./StudentList/StudentList";
import StaffList from "./StaffList";
import Loader from "../components/tools/loader/Loader";
import { getIndividualUserDetail } from "../store/actions/individualUserActions";
import CreateDayOff from "../components/CreateDayOff";

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const [showCreateDayOffForm, setShowCreateDayOffForm] = useState(false);

  const handleCreateDayOffFormState = (value) => {
    setShowCreateDayOffForm(value);
  };

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: detailLoading, userDetail } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getIndividualUserDetail());
    }
  }, [userInfo, history, dispatch]);

  return loading || detailLoading ? (
    <Loader />
  ) : (
    <Section>
      <Navbar firstName={userDetail.firstName} lastName={userDetail.lastName} />
      <Route
        exact
        path="/dashboard"
        component={() => (
          <Main handleCreateDayOffFormState={handleCreateDayOffFormState} />
        )}
      />
      <Route path="/dashboard/students" component={StudentList} />
      <Route path="/dashboard/staffs" component={StaffList} />
      <CreateDayOff
        showState={showCreateDayOffForm}
        handleState={handleCreateDayOffFormState}
      />
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
