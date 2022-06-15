import React, {Fragment} from 'react';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {SetsTable} from "../sets/SetsTable";
import {AppContext} from "../../context/AppContext";
import {Exercise} from "./Exercise";

export const ExerciseTable = () => {
    const {appData, addExercise} = React.useContext(AppContext);

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

                        {appData?.exercises?.map((row) => (
                            <Fragment key={row.id}>
                                <Exercise exercise={row} />
                                <SetsTable row={row}/>
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

