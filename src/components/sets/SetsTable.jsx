import React from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {Set} from "./Set";
import { useAppData } from "../../context/AppDataContext";

export const SetsTable = ({exercise}) => {
    const {addSet} = useAppData();
    const setList = exercise?.sets?.setList;

    return (
        <>
            <TableRow>
                <TableCell colSpan={4}>
                    <TableContainer>
                        <Table sx={{minWidth: 650, backgroundColor:"action.hover"}}>
                            <colgroup>
                                <col style={{width:'10%'}}/>
                                <col style={{width:'10%'}}/>
                                <col style={{width:'20%'}}/>
                                <col style={{width:'20%'}}/>
                                <col style={{width:'10%'}}/>
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell> </TableCell>
                                    <TableCell>Done</TableCell>
                                    <TableCell>Reps</TableCell>
                                    <TableCell>Weight</TableCell>
                                    <TableCell> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.values(setList).map((s) => (
                                    <Set key={s.id} set={s} rowId={exercise.id} />
                                ))}
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell colSpan={5} align={"center"}>
                                        <Button onClick={() => addSet(exercise.id)} startIcon={<AddIcon />}>
                                            Add Set
                                        </Button>
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
