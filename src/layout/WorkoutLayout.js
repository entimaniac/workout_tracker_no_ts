import React from 'react';
import {Paper, TextField} from "@mui/material";
import {AppContext} from "../context/AppContext";
import {ExerciseTable} from "../components/exercises/ExerciseTable";

export const WorkoutLayout = () => {
    const {appData, updateActiveWorkout} = React.useContext(AppContext);
    const updateWorkoutName = (e) => {
        updateActiveWorkout("name", e.target.value)
    }
    return (
        <>
            <Paper>
                <TextField sx={{m: 2}} value={appData.activeWorkout.name} variant="standard"
                           onChange={updateWorkoutName}/>
                <ExerciseTable/>
            </Paper>
        </>
    );
}

