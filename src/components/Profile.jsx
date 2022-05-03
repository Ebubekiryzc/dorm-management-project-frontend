import React from "react";
import styled from "styled-components";
import image1 from "../assets/femaleChar.png";
import image2 from "../assets/maleChar.png";
import { FaUserLock } from "react-icons/fa";
import { cardStyle } from "./ReusableStyles";
import { useSelector } from "react-redux";

// TODO: Rolü, Kaç gün izni kalmış

export default function Profile() {
  let userRole;
  let roles = localStorage.getItem("roles");
  if (roles !== undefined) {
    roles = roles.split(",");
    roles = roles.map(
      (role) => `${role.charAt(0).toLocaleUpperCase()}${role.slice(1)}`
    );

    userRole = roles.join(", ");
  }

  const userDetails = useSelector((state) => state.userDetails);
  const { userDetail } = userDetails;
  return (
    <Section>
      <div className="image">
        <img
          src={userDetail.genderId == "2" ? image1 : image2}
          alt="character"
        />
      </div>
      <div className="title">
        <h2>{`${userDetail.firstName} ${userDetail.lastName}`}</h2>
        <h5>
          <FaUserLock size={"1.7rem"}/>
          <span className="ms-3">{userRole}</span>
        </h5>
      </div>
      <div className="info">
        <div className="custom-container">
          <h5>Kalan İzin Günü</h5>
          <h3>28</h3>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyle};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .image {
    max-height: 10rem;
    overflow: hidden;
    border-radius: 20rem;
    img {
      height: 10rem;
      width: 10rem;
      object-fit: cover;
      border-radius: 20rem;
      transition: 0.5s ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  .title {
    text-align: center;
    h2,
    h5 {
      color: #c8e7ff;
      letter-spacing: 0.3rem;
    }
    h5 {
      letter-spacing: 0.2rem;
    }
  }
  .info {
    display: flex;
    gap: 1rem;
    .custom-container {
      text-align: center;
    }
  }
`;
