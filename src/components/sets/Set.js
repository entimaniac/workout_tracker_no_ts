import React from 'react';
import {IconButton, TableCell, TableRow, TextField} from "@mui/material";
import {AppContext} from "../../context/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";

export const Set = ({rowId, set}) => {
    const {updateSet, deleteSet} = React.useContext(AppContext);

    const updateReps = (event) => {
        updateSet(rowId, set.id, "reps", event.target.value)
    };

    const updateWeight = (event) => {
        updateSet(rowId, set.id, "weight", event.target.value)
    };

    const handleDelete = () => {
        deleteSet(rowId, set.id)
    };

    return (
        <>
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell>
                    <TextField value={set.reps} variant="standard" type={"number"} onChange={updateReps}/>
                </TableCell>
                <TableCell>
                    <TextField value={set.weight} variant="standard" type={"number"} onChange={updateWeight}/>
                </TableCell>
                <TableCell>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon fontSize={"small"}/>
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}

