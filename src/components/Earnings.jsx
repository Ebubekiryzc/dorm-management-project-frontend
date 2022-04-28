import React from "react";
import styled from "styled-components";
import { Tooltip, ResponsiveContainer, BarChart, Bar, XAxis } from "recharts";
import { cardStyle } from "./ReusableStyles";

export default function Earnings() {
  const data = [
    { day: "21 Haziran", data: 4500 },
    { day: "22 Haziran", data: 5000 },
    { day: "23 Haziran", data: 4700 },
    { day: "24 Haziran", data: 4400 },
    { day: "25 Haziran", data: 4800 },
    { day: "26 Haziran", data: 5300 },
    { day: "27 Haziran", data: 6000 },
  ];
  return (
    <Section>
      <div className="top">
        <div className="info">
          <h4>This month earning</h4>
          <h1>$682.5</h1>
          <div className="growth">
            <span>+2.45%</span>
          </div>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Tooltip cursor={false} />
            <Bar
              animationBegin={800}
              animationDuration={2000}
              type="monotone"
              dataKey="data"
              stroke="#c8e7ff"
              fill="#83c5be3d"
              strokeWidth={4}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyle};
  padding: 2rem 0 0 0;
  .top {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
      h1 {
        font-size: 2rem;
      }
      .growth {
        background-color: #83c5be1d;
        padding: 0.5rem;
        border-radius: 1rem;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #c8e7ff;
          span {
            color: black;
          }
        }
        span {
          color: #c8e7ff;
        }
      }
    }
  }
  .chart {
    height: 70%;
    .recharts-default-tooltip {
      background-color: black !important;
      border-color: black !important;
    }
  }
`;
