import React from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";
import { MdMoreTime } from "react-icons/md";
import { BsFillFilePersonFill } from "react-icons/bs";
import { cardStyle } from "./ReusableStyles";

// TODO: Burası işlem olarak düzenlenecek
export default function FAQ(props) {
  const faqs = [
    {
      icon: <MdMoreTime size={"1.7rem"}/>,
      text: "Kendine bir keyif molası ver",
      onClick: props.handleCreateDayOffFormState
    },
    {
      icon: <BsFillFilePersonFill />,
      text: "Görevlileri yönet / Yeni bir görevli ekle",
    },
    {
      icon: <FaUserGraduate />,
      text: "Öğrencileri yönet / Yeni bir öğrenci ekle",
    },
  ];
  return (
    <Section>
      <div className="title">
        <h2>Hızlı İşlemler</h2>
      </div>
      <div className="faqs">
        {faqs.map((faq, index) => {
          return (
            <div className="faq" key={index} onClick={faq.onClick}>
              <div className="info">
                {faq.icon}
                <h4>{faq.text}</h4>
              </div>
              <IoIosArrowForward />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyle};
  .title {
    h2 {
      color: #c8e7ff;
      letter-spacing: 0.3rem;
    }
  }
  .faqs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .faq {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .info {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      svg {
        font-size: 1.4rem;
      }
      &:nth-of-type(2) {
        border-top: 0.01rem solid #bde0fe;
        border-bottom: 0.01rem solid #bde0fe;
        padding: 0.8rem 0;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    svg {
      font-size: 2rem !important;
    }
  }
`;
