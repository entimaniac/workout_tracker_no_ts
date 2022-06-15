import React from 'react';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {AppContext} from "../../context/AppContext";
import {Set} from "./Set";

export const SetsTable = ({row}) => {
    const {addSet} = React.useContext(AppContext);

    return (
        <>
            <TableRow>
                <TableCell> </TableCell>
                <TableCell colSpan={4}>
                    <TableContainer>
                        <Table sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Reps</TableCell>
                                    <TableCell>Weight</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row?.sets?.map(set =>
                                    <Set key={set.id} set={set} rowId={row.id}/>
                                )}
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell colSpan={5} align={"center"}>
                                        <IconButton onClick={() => addSet(row.id)}>
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
