import React, {useState} from 'react';
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const SetsTable = ({sets, addSet}) => {

    return (
        <>
            <TableRow>
                <TableCell> </TableCell>
                <TableCell colSpan={4}>
                    <TableContainer>
                        <Table sx={{minWidth: 650}}>
                            <TableBody>
                                {sets.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell>set: {"" + (index + 1)}</TableCell>
                                        <TableCell>{row}</TableCell>

                                    </TableRow>
                                ))}
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell colSpan={5} align={"center"}>
                                        <IconButton onClick={addSet}>
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

