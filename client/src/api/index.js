import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// Add an interceptor for debugging and handling responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// User API calls
export const UserSignUp = async (data) => API.post("/user/signup", data);
export const UserSignIn = async (data) => API.post("/user/signin", data);

// Dashboard details
export const getDashboardDetails = async (token) => {
  try {
    const response = await API.get("/user/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response; // Return the full response to access .data
  } catch (error) {
    console.error("Error fetching dashboard details:", error.response?.data || error.message);
    throw error;
  }
};

// Get Workouts
export const getWorkouts = async (token) => {
  try {
    const response = await API.get("/user/workouts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error.response?.data || error.message);
    throw error;
  }
};

// Add Workout
export const addWorkout = async (data, token) => {
  try {
    const response = await API.post("/user/add-workout", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding workout:", error.response?.data || error.message);
    throw error;
  }
};

export default API;
