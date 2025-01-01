import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../Utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/cards/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import { addWorkout, getDashboardDetails } from "../api"; // Correct import

// Styled Components
const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const CardWrapper = styled.div``;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [workout, setWorkout] = useState(`#Legs\n-Back Squat\n-5 setsX15 reps\n-30 kg\n-10min`);
  const [buttonLoading, setButtonLoading] = useState(false);

  // Fetch dashboard data
  const dashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("Fittrack");
      const res = await getDashboardDetails(token); // Make sure getDashboardDetails uses GET request
      setData(res.data); // Access data from the response
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Add a new workout
  const addNewWorkout = async (workoutString) => {
    try {
      setButtonLoading(true);
      const token = localStorage.getItem("Fittrack");
      await addWorkout({ workoutString }, token); // Make sure the workout is successfully added
      dashboardData(); // Refresh dashboard data to reflect changes
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
      console.error("Error adding workout:", error);
    }
  };

  useEffect(() => {
    dashboardData();
  }, []); // Run once on mount

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>

        {/* Loading State */}
        {loading ? (
          <div>Loading...</div> // You can replace this with a loading spinner if you prefer
        ) : (
          <>
            {/* Counts Cards Section */}
            <FlexWrap>
              {counts.map((item) => (
                <CountsCard key={item.key} item={item} data={data} />
              ))}
            </FlexWrap>

            {/* Weekly Stats, Category Chart, and Add Workout Section */}
            <FlexWrap>
              <WeeklyStatCard data={data} />
              <CategoryChart data={data} />
              <AddWorkout addNewWorkout={addNewWorkout} />
            </FlexWrap>

            {/* Today's Workout Section */}
            <Section>
              <Title>Today's Workout</Title>
              <CardWrapper>
                <WorkoutCard />
                <WorkoutCard />
                <WorkoutCard />
                <WorkoutCard />
              </CardWrapper>
            </Section>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
