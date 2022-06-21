import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {SideMenu} from "./SideMenu";
import {UserMenu} from "./UserMenu";
import {Logo} from "./Logo";
import {AppContext} from "../../context/AppContext";

export const MenuBar = () => {
    const {addWorkout} = React.useContext(AppContext);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SideMenu/>
                    <Logo/>
                    <Box sx={{flexGrow: 1, display: 'flex' , justifyContent:"center"}}>
                        <Button
                            onClick={addWorkout}
                            sx={{my: 2, color: 'green', display: 'block'}}
                        >
                            New Workout
                        </Button>
                    </Box>
                    <UserMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
