import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../TextInput";
import Button from "../Button";

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

const AddWorkout = ({ addNewWorkout }) => {
  const [workout, setWorkout] = useState(""); // State for workout input
  const [buttonLoading, setButtonLoading] = useState(false); // State for button loading

  const handleAddWorkout = () => {
    setButtonLoading(true);
    addNewWorkout(workout)
      .then(() => {
        setButtonLoading(false);
        setWorkout(""); // Optionally clear the workout field after submission
      })
      .catch(() => {
        setButtonLoading(false);
      });
  };

  return (
    <Card>
      <Title>Add New Workout</Title>
      <TextInput
        label="Workout"
        textArea
        rows={10}
        placeholder={`Enter in this format:
          #Category
          -Workout Name
          -Sets
          -Reps
          -Weight
          -Duration
        `}
        value={workout}
        onChange={(e) => setWorkout(e.target.value)} // Corrected onChange prop
      />
      <Button
        label="Add Workout"
        small
        onClick={handleAddWorkout}
        isLoading={buttonLoading}
        isDisabled={buttonLoading || !workout} // Disable if there's no workout input or if loading
      />
    </Card>
  );
};

export default AddWorkout;
