import React from 'react';
import {TableCell, TableRow, TextField} from "@mui/material";
import {AppContext} from "../../context/AppContext";

export const Exercise = ({exercise}) => {
    const {updateExercise} = React.useContext(AppContext);

    const updateName = (event) => {
        updateExercise(exercise.id, "name", event.target.value)
    };

    const calculateTotalReps = (sets) => {
        return sets.reduce((sum, item) => parseInt(sum) + parseInt(item.reps), 0)
    }

    const calculateTotalWeight = (sets) => {
        return sets.reduce((sum, item) => parseInt(sum) + (parseInt(item.reps) * parseInt(item.weight)), 0)
    }

    return (
        <>
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell>
                    <TextField value={exercise.name} variant="standard" onChange={updateName}/>
                </TableCell>
                <TableCell>{calculateTotalReps(exercise.sets)}</TableCell>
                <TableCell>{calculateTotalWeight(exercise.sets)}</TableCell>
            </TableRow>
        </>
    );
}

