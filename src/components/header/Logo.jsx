import * as React from 'react';
import Typography from '@mui/material/Typography';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export const Logo = () => {
    return (
        <>
            <FitnessCenterIcon sx={{display: 'flex', mr: 1}}/>
            <Typography
                variant="h6"
                noWrap
                component="a"
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
        </>
    );
};
