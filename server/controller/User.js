import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../model/User.js";
import Workout from "../model/Workout.js";

dotenv.config();

// User Registration Function
export const UserRegister = async (req, res, next) => {
    try {
        const { email, password, name, img } = req.body;

        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) return next(createError(409, "Email is already in use"));

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({ name, email, password: hashedPassword, img });
        const createdUser = await user.save();

        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(201).json({ token, user: createdUser });
    } catch (err) {
        next(err);
    }
};

// User Login Function
export const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser) return next(createError(404, "User not found"));

        const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
        if (!isPasswordCorrect) return next(createError(403, "Incorrect password"));

        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({ token, user: foundUser });
    } catch (err) {
        next(err);
    }
};

// Get User Dashboard
export const getUserDashboard = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) return next(createError(401, "Unauthorized access"));

        const user = await User.findById(userId);
        if (!user) return next(createError(404, "User not found"));

        const currentDate = new Date();
        const startToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const endToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

        const totalCaloriesBurnt = await Workout.aggregate([
            { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
            { $group: { _id: null, totalCaloriesBurnt: { $sum: "$caloriesBurned" } } },
        ]);

        const totalWorkouts = await Workout.countDocuments({
            user: userId,
            date: { $gte: startToday, $lt: endToday },
        });

        const avgCaloriesBurntPerWorkout =
            totalCaloriesBurnt.length > 0 ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts : 0;

        const categoryCalories = await Workout.aggregate([
            { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
            { $group: { _id: "$category", totalCaloriesBurnt: { $sum: "$caloriesBurned" } } },
        ]);

        const pieChartData = categoryCalories.map((category, index) => ({
            id: index,
            value: category.totalCaloriesBurnt,
            label: category._id,
        }));

        const weeks = [];
        const caloriesBurnt = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
            weeks.push(`${date.getDate()}th`);
            const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

            const dailyCalories = await Workout.aggregate([
                { $match: { user: user._id, date: { $gte: startOfDay, $lt: endOfDay } } },
                { $group: { _id: null, totalCalories: { $sum: "$caloriesBurned" } } },
            ]);

            caloriesBurnt.push(dailyCalories[0]?.totalCalories || 0);
        }

        const response = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                img: user.img,
            },
            dailyStats: {
                date: currentDate.toISOString(),
                totalCaloriesBurnt: totalCaloriesBurnt[0]?.totalCaloriesBurnt || 0,
                avgCaloriesBurntPerWorkout,
                totalWorkouts,
            },
            chartData: {
                pieChart: pieChartData,
                weeklyCalories: { weeks, caloriesBurnt },
            },
        };

        return res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

// Get Workouts by Date
export const getWorkoutsByDate = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId);
        console.log(req.query.date);

        let date = req.query.date ? new Date(req.query.date) : new Date();
        if (!user) {
            return next(createError(404, "User not found"));
        }

        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        const todaysWorkouts = await Workout.find({
            user: userId,
            date: { $gte: startOfDay, $lt: endOfDay },
        });

        const totalCaloriesBurnt = todaysWorkouts.reduce(
            (total, workout) => total + workout.caloriesBurned, 0
        );

        return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
    } catch (err) {
        next(err);
    }
};

// Add Workout
export const addWorkout = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { workoutString } = req.body;

        if (!workoutString) {
            return next(createError(400, "Workout string is missing"));
        }

        const parsedWorkouts = [];
        let currentCategory = "";
        const eachWorkout = workoutString.split(";").map((line) => line.trim());

        await eachWorkout.forEach((line, index) => {
            if (line.startsWith("#")) {
                const parts = line.split("\n").map((part) => part.trim());
                if (parts.length < 5) {
                    return next(createError(400, `Workout string is missing ${index + 1}th workout`));
                }

                currentCategory = parts[0].substring(1).trim();

                const workoutDetails = parsedWorkoutLine(parts); // Corrected function name
                if (!workoutDetails) {
                    return next(createError(400, "Please enter in proper format"));
                }

                workoutDetails.category = currentCategory;
                parsedWorkouts.push(workoutDetails);
            } else {
                return next(createError(400, `Workout string is missing ${index + 1}th workout`));
            }
        });

        await Promise.all(parsedWorkouts.map(async (workout) => {
            workout.caloriesBurned = calculateCaloriesBurnt(workout);
            await Workout.create({ ...workout, user: userId });
        }));

        return res.status(201).json({
            message: "Workouts added successfully",
            workouts: parsedWorkouts,
        });
    } catch (err) {
        next(err);
    }
};

// Helper Functions
const parsedWorkoutLine = (parts) => {
    const details = {};

    if (parts.length >= 5) {
        details.workoutName = parts[1].substring(1).trim();
        details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
        details.reps = parseInt(parts[2].split("sets")[1].split("reps")[0].substring(1).trim());
        details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
        details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());

        return details;
    }

    return null;
};

const calculateCaloriesBurnt = (workoutDetails) => {
    const durationInMinutes = parseInt(workoutDetails.duration);
    const weightInKg = parseInt(workoutDetails.weight);

    if (isNaN(durationInMinutes) || isNaN(weightInKg)) {
        return 0;  // Return 0 if invalid values
    }

    const CaloriesBurntPerMinute = 5;
    return durationInMinutes * CaloriesBurntPerMinute * weightInKg;
};
