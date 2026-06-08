import * as React from 'react';
import {BottomNavigation, BottomNavigationAction, Link, Paper} from "@mui/material";

export const Footer = () => {

    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation showLabels={true}>
                <BottomNavigationAction
                    component={Link}
                    label={"github"}
                    href={"https://github.com/entimaniac/workout_tracker_no_ts"}
                />
            </BottomNavigation>
        </Paper>
    );
};
