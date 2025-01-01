import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./Utils/Themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts"; // Import Workouts component
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useSelector } from "react-redux";

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  // const [user, setUser] = useState(true); // User authentication state
    const {currentUser} = useSelector((state) => state.user)
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar  currentUser= {currentUser}/>
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              {/* Add more routes as needed */}
              {/* <Route path="*" element={<Dashboard />} /> Fallback route */}
            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
