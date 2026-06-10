import React from 'react';
import {Checkbox, TableCell, TableRow, TextField} from "@mui/material";
import {DeleteConfirm} from "../shared/input/DeleteConfirm";
import { useAppData } from "../../context/AppDataContext";

export const Set = ({rowId, set}) => {
    const {updateSet, deleteSet, toggleSetComplete} = useAppData();

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
            <TableRow
                sx={{
                    '&:last-child td, &:last-child th': {border: 0},
                    opacity: set.isComplete ? 0.7 : 1,
                }}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={Boolean(set.isComplete)}
                        onChange={() => toggleSetComplete(rowId, set.id)}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        disabled={set.isComplete}
                        value={set.reps}
                        variant="standard"
                        type={"number"}
                        onChange={updateReps}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        disabled={set.isComplete}
                        value={set.weight}
                        variant="standard"
                        type={"number"}
                        onChange={updateWeight}
                    />
                </TableCell>
                <TableCell>
                    <DeleteConfirm onClick={handleDelete}/>
                </TableCell>
            </TableRow>
        </>
    );
}
