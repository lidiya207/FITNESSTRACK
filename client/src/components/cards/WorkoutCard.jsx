import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

// Styled Components
const Card = styled.div`
flex: 1;
min-width:250px;
max-width:400px;
  padding: 16px 18px ;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 6px;
 @media (max-width:600px){
    padding: 12px 14px;
 }

`;

const Category = styled.div`
width:fit-content;
  font-size: 16px;
  font-weight: 500;
  padding:10px;
  color: ${({ theme }) => theme.primary};
  background: ${({theme})=> theme.popup_text_primary};
`;

const Name = styled.div`
  font-size:20 px;
  font-weight: 600;
`;

const Sets = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  gap: 6px
`;

const Flex = styled.div`
  display: flex;
  gap: 16px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

// Component
const WorkoutCard = () => {
  return (
    <Card>
      <Category>#Legs</Category>
      <Name>Back Squat</Name>
      <Sets>Count: 5 sets x 10 reps</Sets>
      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: "20px" }} />
          <span>Strength</span>
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: "20px" }} />
          <span>30 min</span>
        </Details>
        
      </Flex>
      
    </Card>
  );
};

export default WorkoutCard;
