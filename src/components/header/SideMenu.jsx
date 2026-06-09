import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Divider, IconButton, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {WorkoutList} from "../workouts/WorkoutList";
import { useUiState } from "../../context/UiContext";

export const SideMenu = () => {
    const [open, setOpen] = React.useState(false);

    const {setOpenExerciseManagementModal} = useUiState();
    const handleOpenExerciseManagement = () => setOpenExerciseManagementModal(true);

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <IconButton onClick={() => toggleOpen()}>
                <MenuIcon/>
            </IconButton>
            <Drawer
                open={open}
                onClose={toggleOpen}
            >
                <List>
                    <ListItem sx={{px: 2, pt: 2}}>
                        <Typography variant="h6">5/3/1 Planner</Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary={"Sessions"} secondary={"Switch between split days"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={handleOpenExerciseManagement}>
                            <ListItemText primary={"Manage Main Lift Maxes"}/>
                        </ListItemButton>
                    </ListItem>
                    <Divider/>
                    <WorkoutList/>
                    <Divider/>
                </List>
            </Drawer>
        </>
    );
}
