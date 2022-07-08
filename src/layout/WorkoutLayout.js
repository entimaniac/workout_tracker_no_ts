import React from 'react';
import {Grid, Paper, TextField} from "@mui/material";
import {AppContext} from "../context/AppContext";
import {ExerciseTable} from "../components/exercises/ExerciseTable";

export const WorkoutLayout = () => {
    const {updateWorkout, activeWorkoutId, workoutList} = React.useContext(AppContext);

    const updateWorkoutName = (e) => {
        updateWorkout(activeWorkoutId, "name", e.target.value)
    }

    return (
        <>
            <Paper>
                {workoutList[activeWorkoutId] ?
                    <>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid item>
                                <TextField sx={{m: 2}} value={workoutList[activeWorkoutId]?.name}
                                           variant="standard"
                                           onChange={updateWorkoutName}/>
                            </Grid>
                        </Grid>
                        <ExerciseTable/>
                    </>
                    : ""}
            </Paper>
        </>
    );
}

