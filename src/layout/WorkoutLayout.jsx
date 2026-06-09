import React from 'react';
import {Box, Grid, MenuItem, Paper, Stack, TextField, Typography} from "@mui/material";
import {ExerciseTable} from "../components/exercises/ExerciseTable";
import {MainLiftSection} from "../components/exercises/MainLiftSection";
import { useAppData } from "../context/AppDataContext";

export const WorkoutLayout = () => {
    const {
        updateWorkout,
        updateWorkoutWeek,
        activeWorkoutId,
        workoutList,
        splitDefinitions,
        weekDefinitions,
        weekOrder,
    } = useAppData();

    const activeWorkout = workoutList[activeWorkoutId];
    const splitDefinition = splitDefinitions[activeWorkout?.splitId];

    const updateWorkoutName = (e) => {
        updateWorkout(activeWorkoutId, "name", e.target.value)
    }

    return (
        <>
            <Paper>
                {activeWorkout ? (
                    <Stack spacing={3} sx={{p: 2}}>
                        <Grid
                            container
                            spacing={2}
                            sx={{alignItems: "center", justifyContent: "space-between"}}
                        >
                            <Grid size={{xs: 12, md: 6}}>
                                <TextField
                                    fullWidth
                                    label="Session Name"
                                    value={activeWorkout.name}
                                    variant="standard"
                                    onChange={updateWorkoutName}
                                />
                            </Grid>
                            <Grid size={{xs: 12, md: 3}}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Week"
                                    value={activeWorkout.weekKey}
                                    SelectProps={{
                                        renderValue: (selected) => {
                                            const selectedWeek = weekDefinitions[selected];

                                            return (
                                                <Box sx={{display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap"}}>
                                                    <Typography>{selectedWeek?.name}</Typography>
                                                    <Typography color="text.secondary" variant="body2">
                                                        {selectedWeek?.description}
                                                    </Typography>
                                                </Box>
                                            );
                                        },
                                    }}
                                    onChange={(event) =>
                                        updateWorkoutWeek(activeWorkoutId, event.target.value)
                                    }
                                >
                                    {weekOrder.map((weekKey) => {
                                        const week = weekDefinitions[weekKey];

                                        return (
                                        <MenuItem key={week.id} value={week.id}>
                                            <Box sx={{display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap"}}>
                                                <Typography>{week.name}</Typography>
                                                <Typography color="text.secondary" variant="body2">
                                                    {week.description}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        );
                                    })}
                                </TextField>
                            </Grid>
                            <Grid size={{xs: 12, md: 3}}>
                                <Typography variant="body1">
                                    {new Date(activeWorkout.dateCreated).toLocaleDateString()}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                    {splitDefinition?.description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <MainLiftSection/>
                        <ExerciseTable/>
                    </Stack>
                ) : ""}
            </Paper>
        </>
    );
}
