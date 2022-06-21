import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {SideMenu} from "./SideMenu";
import {UserMenu} from "./UserMenu";


export const MenuBar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SideMenu/>


                    <FitnessCenterIcon sx={{display: 'flex', mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LIFT
                    </Typography>

                    <Box sx={{flexGrow: 1, display: 'flex'}}>
                        <Button
                            onClick={null}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            History
                        </Button>
                        <Button
                            onClick={null}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Calendar
                        </Button>
                        <Button
                            onClick={null}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            New Workout
                        </Button>
                    </Box>
                    <UserMenu/>
                    <Box sx={{flexGrow: 0}}>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
