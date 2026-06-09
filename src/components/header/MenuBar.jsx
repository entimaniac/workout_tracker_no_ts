import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {SideMenu} from "./SideMenu";
import {UserMenu} from "./UserMenu";
import {Logo} from "./Logo";
import { useAppData } from "../../context/AppDataContext";

export const MenuBar = () => {
    const {addWorkout, activeWorkout} = useAppData();
    const nextWeekKey = activeWorkout?.weekKey || "5s";

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SideMenu/>
                    <Logo/>
                    <Box sx={{flexGrow: 1, display: 'flex' , justifyContent:"center"}}>
                        <Button
                            onClick={() => addWorkout("split1", nextWeekKey)}
                            sx={{my: 2, color: 'inherit', display: 'block'}}
                        >
                            New Split 1
                        </Button>
                        <Button
                            onClick={() => addWorkout("split2", nextWeekKey)}
                            sx={{my: 2, color: 'inherit', display: 'block'}}
                        >
                            New Split 2
                        </Button>
                    </Box>
                    <UserMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
