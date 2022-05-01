import React, { useEffect } from "react";
import scrollreveal from "scrollreveal";
import styled from "styled-components";
import Analytics from "../components/Analytics";
import Earnings from "../components/Earnings";
import FAQ from "../components/FAQ";
import Profile from "../components/Profile";
import Transfers from "../components/Transfers";

export default function Main() {
  useEffect(() => {
    const scroll = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    scroll.reveal(
      `
            nav,
            .row__one,
            .row__two
          `,
      { opacity: 0, interval: 10 }
    );
  }, []);
  return (
    <Section>
      <div className="grid">
        <div className="row__one">
          <Analytics />
          <FAQ />
        </div>
        <div className="row__two">
          <Earnings />
          <Transfers />
          <Profile />
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 50%;
      gap: 1rem;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
