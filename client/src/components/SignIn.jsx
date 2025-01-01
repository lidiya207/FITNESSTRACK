import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput"; // Import the TextInput component
import Button from "./Button"; // Assuming this is another custom component
import { useDispatch } from "react-redux";
import { UserSignIn } from "../api";
import { loginSuccess } from "../redux/reducer/userSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 25px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const Span = styled.span`
  color: gray;
  font-size: 14px;
  font-weight: 400;
  margin-top: 0;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin-top: 24px;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("Login Success");
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };

  return (
    <Container>
      <div>
        <Heading>Welcome Back to Fittrack</Heading>
        <Span>Please sign in with your details</Span>
      </div>
      <FormContainer>
        <TextInput
          label="Email Address"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Ensure correct onChange handler
        />

        <TextInput
          label="Password"
          placeholder="Enter Your Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Ensure correct onChange handler
        />

        <Button
          label="Sign In"
          onClick={handleSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </FormContainer>
    </Container>
  );
};

export default SignIn;
