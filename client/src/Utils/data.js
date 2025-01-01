// App.js

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { FitnessCenterRounded, LocalFireDepartmentRounded, TimelineRounded } from "@mui/icons-material";
import CountsCard from "../components/cards/CountsCard"; // Import the CountsCard component

// Define your theme with primary, text_primary, green, and red colors
const theme = {
  primary: "#007bff",
  text_primary: "#333",
  green: "#28a745",
  red: "#dc3545",
};

// Define the counts array with data
export const counts = [
  {
    name: "Calories Burned",
    icon: <LocalFireDepartmentRounded />,
    desc: "Total Calories",
    key: "totalCaloriesBurn",
    unit: "kcal",
    color: "#eb9e34",
    lightColor: "#FDF4EA",
  },
  {
    name: "Workouts",
    icon: <FitnessCenterRounded />,
    desc: "Total No. of Workouts",
    key: "totalWorkouts",
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },
  {
    name: "Average Calorie",
    icon: <TimelineRounded />,
    desc: "Average Calories Burned",
    key: "avgCaloriesBurnt",
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {counts.map((item, index) => (
          <CountsCard key={index} item={item} />
        ))}
      </Container>
    </ThemeProvider>
  );
}

export default App;

// Styled container for displaying cards
const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  flex-wrap: wrap;
`;
