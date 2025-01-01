import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.text_primary};
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const CategoryChart = ({ data }) => (
  <Card>
    <Title>Weekly Calories Burned</Title>
    {data?.pieChartData && (
      <PieChart
        series={[
          {
            data: data.pieChartData,
            innerRadius: 30,
            outerRadius: 120,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        height={300}
      />
    )}
  </Card>
);

export default CategoryChart;
