import mongoose from "mongoose";


const WorkoutSchema = new mongoose.Schema(   {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },

     Category: {
        type: String,
        required: true,
     },
      WorkoutName: {
        type: String,
        required: true,
        unique:true,

     },
     
       sets: {
        type: Number,
    },
      reps: {
        type: Number,
     },
     duration: {
        type: Number,
     },
     caloriesBurned:{
        type: Number,
     },
    date: {
        type: Date,
        default: Date . now,
    },
},
{timestamps: true}
)


export default mongoose.model("Workout" , WorkoutSchema);