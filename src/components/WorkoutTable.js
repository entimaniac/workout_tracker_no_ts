import React, {Fragment, useState} from 'react';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {SetsTable} from "./SetsTable";

export const WorkoutTable = () => {
    const initialExercises = [
        {name: "Bicep Curl", weight: 45, sets: [10, 11, 12]},
        {name: "Bench", weight: 100, sets: [14, 11, 12]},
        {name: "Squat", weight: 100, sets: [10, 15, 12]},
    ]
    const [exercises, setExercises] = useState(initialExercises)

    const addExercise = () => {
        let newRow = {name: "Squat", weight: 100, sets: [10, 15, 12]}
        setExercises([...exercises, newRow])
    }

    const addSet = (name) => {
        let updatedExerciseSets = exercises.map(item => {
                if (item.name === name) {
                    return {...item, sets: [...item.sets, 100]}
                }
                return item;
            }
        );

        setExercises(updatedExerciseSets)
    }

    return (
        <>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Reps</TableCell>
                            <TableCell>Total Reps</TableCell>
                            <TableCell>Total Weight</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {exercises.map((row) => (
                            <Fragment key={row.name}>
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.weight}</TableCell>
                                    <TableCell>{}</TableCell>
                                    <TableCell>10l</TableCell>
                                    <TableCell>450</TableCell>

                                </TableRow>
                                <SetsTable sets={row.sets} addSet={() => addSet(row.name)}/>
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

