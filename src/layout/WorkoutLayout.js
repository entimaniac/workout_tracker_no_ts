import React from 'react';
import {Grid, Paper, TextField} from "@mui/material";
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
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item>
                        <TextField sx={{m: 2}} value={appData.activeWorkout.name}
                                   variant="standard"

                                   onChange={updateWorkoutName}/>
                    </Grid>
                </Grid>

                <ExerciseTable/>
            </Paper>
        </>
    );
}

