import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Divider, IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {WorkoutList} from "../workouts/WorkoutList";
import {AppContext} from "../../context/AppContext";

export const SideMenu = () => {
    const [open, setOpen] = React.useState(false);

    const {setOpenExerciseManagementModal} = React.useContext(AppContext);
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
                    <ListItem>
                        <ListItemText primary={"Hii"}/>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary={"Calendar"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={handleOpenExerciseManagement}>
                            <ListItemText primary={"Manage Exercises"}/>
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
