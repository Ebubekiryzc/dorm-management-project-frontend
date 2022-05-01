import React, { useEffect, useState } from "react";
import styled from "styled-components";
import scrollreveal from "scrollreveal";

import { MdDateRange, MdSpaceDashboard } from "react-icons/md";
import { FaBed, FaGraduationCap } from "react-icons/fa";
import { DiDatabase } from "react-icons/di";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Sidebar() {
  const [navbarState, setNavbarState] = useState(false);
  const [role, setRole] = useState("student");
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));

  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (localStorage.getItem("roles").includes("admin")) {
        setRole("admin");
      } else if (localStorage.getItem("roles").includes("staff")) {
        setRole("staff");
      }
    }

    const scroll = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    scroll.reveal(
      `
    .brand,
    .links>ul>.nav-link:nth-of-type(1),
    .links>ul>.nav-link:nth-of-type(2),
    .links>ul>.nav-link:nth-of-type(3),
    .links>ul>.nav-link:nth-of-type(4),
    .links>ul>.nav-link:nth-of-type(5),
    .links>ul>.nav-link:nth-of-type(6),
    .logout
    `,
      { opacity: 0, interval: 30 }
    );
  }, [history, userInfo]);

  //TODO: if role == "admin" o zaman şu seçenekler olsun gibi bir şey eklenecek.

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <FaBed />
            <span> Dormy </span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div className="links">
            <ul>
              <NavLink exact to="/dashboard" className="nav-link">
                <div>
                  <MdSpaceDashboard />
                  <span>Dashboard</span>
                </div>
              </NavLink>
              <NavLink to="/dashboard/day_offs" className="nav-link">
                <div>
                  <MdDateRange />
                  <span>İzinlerim</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/staffs"
                className={`${
                  role === "admin" ? "display-block" : "display-none"
                } nav-link`}
              >
                <div>
                  <BsPersonCircle />
                  <span>Görevliler</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/students"
                className={`${
                  role === "admin" || role === "staff"
                    ? "display-block"
                    : "display-none"
                } nav-link`}
              >
                <div>
                  <FaGraduationCap />
                  <span>Öğrenciler</span>
                </div>
              </NavLink>
              <NavLink
                to="/dashboard/database"
                className={`${
                  role === "admin" ? "display-block" : "display-none"
                } nav-link`}
              >
                <div>
                  <DiDatabase />
                  <span>Veri Tabanı</span>
                </div>
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="logout">
          <Link to="/" onClick={handleLogout}>
            <FiLogOut />
            <span className="logout">Çıkış Yap</span>
          </Link>
        </div>
      </Section>
      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
          <ul>
            <NavLink exact to="/dashboard" className="nav-link">
              <div>
                <MdSpaceDashboard />
                <span>Dashboard</span>
              </div>
            </NavLink>
            <NavLink to="/dashboard/dayoffs" className="nav-link">
              <div>
                <MdDateRange />
                <span>İzinlerim</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/staffs"
              className={`${
                role === "admin" ? "display-block" : "display-none"
              } nav-link`}
            >
              <div>
                <BsPersonCircle />
                <span>Görevliler</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/students"
              className={`${
                role === "admin" || role === "staff"
                  ? "display-block"
                  : "display-none"
              } nav-link`}
            >
              <div>
                <FaGraduationCap />
                <span>Öğrenciler</span>
              </div>
            </NavLink>
            <NavLink
              to="/dashboard/database"
              className={`${
                role === "admin" ? "display-block" : "display-none"
              } nav-link`}
            >
              <div>
                <DiDatabase />
                <span>Veri Tabanı</span>
              </div>
            </NavLink>
            <NavLink
              className="custom-bg-danger nav-link"
              exact
              to="/"
              onClick={handleLogout}
            >
              <div>
                <FiLogOut />
                <span>Çıkış Yap</span>
              </div>
            </NavLink>
          </ul>
        </div>
      </ResponsiveNav>
    </>
  );
}

const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #212121;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  font-size: 1.2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #c8e7ff;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #c8e7ff;
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .nav-link {
          border-radius: 0.6rem;
          padding: 0.6rem 1rem;
          text-decoration: none;
          &:hover {
            background-color: #c8e7ff;
            div {
              color: black;
            }
          }
          div {
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #c8e7ff;
          div {
            color: black;
          }
        }
      }
    }
  }
  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #e63946;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.nav`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background-color: black;
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  font-size: 1.2rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      .nav-link {
        border-radius: 0.6rem;
        padding: 0.6rem 1rem;
        text-decoration: none;
        &:hover {
          background-color: #c8e7ff;
          div {
            color: black;
          }
        }
        div {
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: #c8e7ff;
        div {
          color: black;
        }
      }
    }
  }
`;
