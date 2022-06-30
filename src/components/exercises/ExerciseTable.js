import React, {Fragment} from 'react';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {SetsTable} from "../sets/SetsTable";
import {AppContext} from "../../context/AppContext";
import {Exercise} from "./Exercise";

export const ExerciseTable = () => {
    const {appData, addExercise, updateActiveWorkout} = React.useContext(AppContext);
    const updateWorkoutName = (e) => {
        updateActiveWorkout("name",  e.target.value)
    }
    let exerciseList = appData?.activeWorkout?.exercises?.exerciseList || {};
    return (
        <>
            <TextField value={appData.activeWorkout.name} variant="standard" onChange={updateWorkoutName}/>

            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Total Reps</TableCell>
                            <TableCell>Total Weight</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(exerciseList)?.map((exercise) => (
                            <Fragment key={exercise.id}>
                                <Exercise exercise={exercise}/>
                                <SetsTable exercise={exercise}/>
                            </Fragment>
                        ))}
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell colSpan={5} align={"center"}>
                                <IconButton onClick={addExercise}>
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

