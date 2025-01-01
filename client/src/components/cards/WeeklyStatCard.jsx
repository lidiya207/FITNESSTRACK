import React from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts/BarChart";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.text_primary};
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 600px) {
    padding: 16px;
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

const WeeklyStatCard = ({ data }) => {
  // Prepare chart data
  const chartData =
    data?.totalWeeksCaloriesBurnt?.weeks?.map((week, index) => ({
      name: week,
      calories: data?.totalWeeksCaloriesBurnt?.caloriesBurned[index],
    })) || [];

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      {chartData.length > 0 && (
        <BarChart
          series={[{
            data: chartData.map((item) => item.calories),
            label: "Calories Burned",
          }]}
          xAxis={[{
            data: chartData.map((item) => item.name),
            label: "Week",
            scaleType: "band", // Set the scale type to "band" for categorical x-axis
          }]}
          yAxis={[{ label: "" }]}
          height={300}
        />
      )}
    </Card>
  );
};

export default WeeklyStatCard;
