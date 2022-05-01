import React from "react";
import styled from "styled-components";

export default function Loader() {
  return (
    <Div>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  ul {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
    display: flex;

    li {
      list-style: none;
      width: 2.5rem;
      height: 2.5rem;
      background: #ffffff;
      border-radius: 50%;
      animation: grow 1.6s ease-in-out infinite;

      &:nth-child(1) {
        animation-delay: -1.4s;
        background-color: #ffff00;
        box-shadow: 0 0 3.125rem #ffff00;
      }

      &:nth-child(2) {
        animation-delay: -1.2s;
        background-color: #76ff03;
        box-shadow: 0 0 3.125rem #76ff03;
      }
      &:nth-child(3) {
        animation-delay: -1s;
        background-color: #f06292;
        box-shadow: 0 0 3.125rem #f06292;
      }
      &:nth-child(4) {
        animation-delay: -0.8s;
        background-color: #4fc4f7;
        box-shadow: 0 0 3.125rem #4fc4f7;
      }
      &:nth-child(5) {
        animation-delay: -0.6s;
        background-color: #ba68c8;
        box-shadow: 0 0 3.125rem #ba68c8;
      }
      &:nth-child(6) {
        animation-delay: -0.4s;
        background-color: #f57c00;
        box-shadow: 0 0 3.125rem #f57c00;
      }
      &:nth-child(7) {
        animation-delay: -0.2s;
        background-color: #673ab7;
        box-shadow: 0 0 3.125rem #673ab7;
      }
    }
  }

  @keyframes grow {
    0%,
    40%,
    100% {
      transform: scale(0.2);
    }
    20% {
      transform: scale(1);
    }
  }
`;
