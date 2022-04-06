import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

export default function Navbar() {
  return (
    <Nav>
      <div className="title">
        <h4>Hi Kishan,</h4>
        <h1>
          Welcome to <span>MY TAXI DASHBOARD</span>
        </h1>
      </div>

    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: white;
  .title {
    h1 {
      span {
        margin-left: 0.5rem;
        color: #c8e7ff;
        letter-spacing: 0.2rem;
      }
    }
  }
  .search {
    background-color: #212121;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: #c8e7ff;
    }
    input {
      background-color: transparent;
      border: none;
      color: #c8e7ff;
      letter-spacing: 0.3rem;
      &::placeholder {
        color: #c8e7ff;
      }
      &:focus {
        outline: none;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;
          margin: 1rem 0;
        }
      }
    }
  }
`;
