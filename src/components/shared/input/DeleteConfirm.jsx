import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {ButtonGroup, IconButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

export const DeleteConfirm = ({onClick}) => {
    const [toggle, setToggle] = React.useState(true);
    const handleToggle = () => setToggle(!toggle);

    return (
        <>
            <ButtonGroup size="small">

                {
                    toggle ?
                        <>
                            <IconButton onClick={handleToggle}>
                                <DeleteIcon fontSize={"small"}/>
                            </IconButton>
                            <IconButton disabled={true} sx={{visibility:"hidden"}}>
                                <DeleteIcon fontSize={"small"}/>
                            </IconButton>
                        </>
                        :
                        <>
                            <IconButton onClick={handleToggle}>
                                <CancelIcon fontSize={"small"}/>
                            </IconButton>
                            <IconButton onClick={onClick}>
                                <CheckIcon fontSize={"small"}/>
                            </IconButton>
                        </>
                }
            </ButtonGroup>

        </>
    );
}
