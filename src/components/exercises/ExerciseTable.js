import React, {Fragment} from 'react';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {SetsTable} from "../sets/SetsTable";
import {AppContext} from "../../context/AppContext";
import {Exercise} from "./Exercise";

export const ExerciseTable = () => {
    const {appData, addExercise} = React.useContext(AppContext);
    const exList = appData?.exercises?.exerciseList;

    return (
        <>
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

                        {Object.values(exList).map((ex) => (
                            <Fragment key={ex.id}>
                                <Exercise exercise={ex} />
                                <SetsTable row={ex}/>
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

