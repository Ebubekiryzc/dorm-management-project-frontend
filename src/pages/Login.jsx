import React, { useEffect } from "react";
import styled from "styled-components";
import loginPageBackground from "../assets/loginPageBackground.jpg";
import githubLogo from "../assets/githubLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../store/actions/authActions";

import Loader from "../components/tools/loader/Loader";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextInput from "../components/tools/formikComponents/textInput/TextInput";

export default function Login() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  const history = useHistory();

  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard");
    }
  }, [userInfo, history]);

  const handleLoginButton = (username, password) => {
    dispatch(login(username, password));
  };

  const initialValues = { username: "", password: "" };
  const validationSchema = yup.object({
    username: yup.string().required("Kullanıcı adı alanı doldurulmalıdır."),
    password: yup.string().required("Parola alanı doldurulmalıdır."),
  });

  return (
    <Section>
      {!loading ? 
      (<><div className="img-box">
        <img src={loginPageBackground} alt="Login page background" />
      </div>
      <div className="content-box">
        <div className="form-box">
          <h2>GİRİŞ</h2>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) =>
              handleLoginButton(values.username, values.password)
            }
          >
            {(formik) => (
              <Form>
                <div className="input-box">
                  <TextInput name="username" label="Kullanıcı Adı" />
                </div>
                <div className="input-box">
                  <TextInput name="password" label="Parola" type="password" />
                </div>
                <div className="input-box">
                  <input
                    className="sign-in-button"
                    type="submit"
                    value="Giriş Yap"
                  />
                </div>
              </Form>
            )}
          </Formik>
          <h3>Github Linki</h3>
          <ul className="sci">
            <li>
              <img src={githubLogo} alt="Github Adresi" />
            </li>
          </ul>
        </div>
      </div></>) : (<Loader />)}
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #121212;

  .img-box {
    position: relative;
    width: 50%;
    height: 100%;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(225deg, #e91e63, #03a9f4);
      z-index: 1;
      mix-blend-mode: screen;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }

  .content-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;

    .form-box {
      width: 50%;

      h2 {
        color: #7692A0;
        font-weight: 600;
        font-size: 1.5em;
        text-transform: uppercase;
        margin-bottom: 1.25rem;
        border-bottom: 0.25rem solid #ff4584;
        display: inline-block;
        letter-spacing: 1px;
      }

      .input-box {
        margin-bottom: 1.25rem;

        span {
          font-size: 1rem;
          margin-bottom: 5px;
          display: inline-block;
          color: #607d8b;
          font-weight: 500;
          font-size: 1em;
          letter-spacing: 1px;
        }

        input {
          width: 100%;
          padding: 0.625rem 1.25rem;
          outline: none;
          font-weight: 400;
          border: 1px solid #607d8b;
          font-size: 1em;
          letter-spacing: 1px;
          color: #607d8b;
          background: transparent;
          border-radius: 1.8rem;

          &[type="submit"] {
            background: #ff4584;
            color: #ffffff;
            outline: none;
            border: none;
            font-weight: 500;
            cursor: pointer;

            &:hover {
              background: #f53677;
            }
          }
        }
      }

      h3 {
        color: #607d8b;
        text-align: center;
        margin: 5rem 0 0.625rem;
        font-weight: 500;
        letter-spacing: -1px;
      }

      .sci {
        display: flex;
        justify-content: center;
        align-items: center;

        li {
          list-style: none;
          width: 3.125rem;
          height: 3.125rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #607d8b;
          border-radius: 50%;
          margin: 0 7px;
          cursor: pointer;

          &:hover {
            background: #ff4584;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .img-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .content-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      z-index: 1;

      .form-box {
        width: 100%;
        padding: 2.5rem;
        background: rgb(255 255 255 / 0.9);
        margin: 50px;

        h3 {
          color: #607d8b;
          text-align: center;
          margin: 1.8rem 0 0.625rem;
          font-weight: 300;
          letter-spacing: -1px;
        }
      }
    }
  }
`;
