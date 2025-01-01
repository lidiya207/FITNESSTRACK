import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput"; // Assuming TextInput is a separate component
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/userSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 25px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px; /* Reduced gap below heading */
`;

const Span = styled.span`
  color: gray;
  font-size: 14px;
  font-weight: 400;
  margin-top: 0; /* Removed any default margin above the span */
`;

const FormContainer = styled.div`
  display: flex;
  gap: 16px; /* Reduced gap between form elements */
  flex-direction: column;
  margin-top: 24px; /* Adjusted margin-top */
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      try {
        const res = await UserSignUp({ name, email, password });
        dispatch(loginSuccess(res.data));  // Dispatch login success after successful signup
        alert("Account created successfully!");
        setLoading(false);
        setButtonDisabled(false);
      } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Heading>Create New Account</Heading>
        <Span>Please enter details to create a new account</Span>
      </div>
      <FormContainer>
        <TextInput
          label="Full Name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter Your Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label={loading ? "Creating..." : "Sign Up"}
          primary={true}
          onClick={handleSignUp}
          disabled={buttonDisabled || loading}
        />
      </FormContainer>
    </Container>
  );
};

export default SignUp;
