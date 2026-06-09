import React, {Fragment} from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {SetsTable} from "../sets/SetsTable";
import {Exercise} from "./Exercise";
import { useAppData } from "../../context/AppDataContext";

export const ExerciseTable = () => {
    const {addExercise, accessoryExercises} = useAppData();

    return (
        <>
            <Typography sx={{mb: 2}} variant="h4">
                Accessory Work
            </Typography>
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
                        {accessoryExercises.map((exercise) => (
                            <Fragment key={exercise.id}>
                                <Exercise exercise={exercise}/>
                                <SetsTable exercise={exercise}/>
                            </Fragment>
                        ))}
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell colSpan={5} align={"center"}>
                                <Button onClick={() => addExercise()} startIcon={<AddIcon />}>
                                    Add Accessory Exercise
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
