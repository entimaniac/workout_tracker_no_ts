import React from 'react';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {AppContext} from "../../context/AppContext";
import {Set} from "./Set";

export const SetsTable = ({exercise}) => {
    const {addSet} = React.useContext(AppContext);
    const setList = exercise?.sets?.setList;

    return (
        <>
            <TableRow>
                <TableCell colSpan={4}>
                    <TableContainer>
                        <Table sx={{minWidth: 650, backgroundColor:"action.hover"}}>
                            <colgroup>
                                <col style={{width:'10%'}}/>
                                <col style={{width:'20%'}}/>
                                <col style={{width:'20%'}}/>
                                <col style={{width:'10%'}}/>
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell> </TableCell>
                                    <TableCell>Reps</TableCell>
                                    <TableCell>Weight</TableCell>
                                    <TableCell> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.values(setList).map((s, index) => (
                                    <Set key={index} set={s} rowId={exercise.id} />
                                ))}
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell colSpan={5} align={"center"}>
                                        <IconButton onClick={() => addSet(exercise.id)}>
                                            <AddIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TableCell>
            </TableRow>
        </>
    );
}

