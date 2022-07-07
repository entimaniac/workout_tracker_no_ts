import React from 'react';
import {TableCell, TableRow, TextField} from "@mui/material";
import {AppContext} from "../../context/AppContext";
import {DeleteConfirm} from "../shared/input/DeleteConfirm";

export const Exercise = ({exercise}) => {
    const {updateExercise, deleteExercise} = React.useContext(AppContext);

    const updateName = (event) => {
        updateExercise(exercise.id, "name", event.target.value)
    };

    const handleDelete = () => {
        deleteExercise(exercise.id)
    };

    const calculateTotalReps = (sets) => {
        return Object.values(sets.setList).reduce((sum, item) => parseInt(sum) + parseInt(item.reps) || 0, 0)
    }

    const calculateTotalWeight = (sets) => {
        return Object.values(sets.setList).reduce((sum, item) => parseInt(sum) + (parseInt(item.reps) * parseInt(item.weight)) || 0, 0)
    }

    return (
        <>
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell>
                    <TextField value={exercise.name} variant="standard" onChange={updateName}/>
                </TableCell>
                <TableCell>{calculateTotalReps(exercise.sets)}</TableCell>
                <TableCell>{calculateTotalWeight(exercise.sets)}</TableCell>
                <TableCell>
                    <DeleteConfirm onClick={handleDelete}/>
                </TableCell>
            </TableRow>
        </>
    );
}

