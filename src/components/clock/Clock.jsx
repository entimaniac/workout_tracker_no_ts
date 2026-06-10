import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {getColor} from "./ClockUtils";

export const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => setTime(new Date()), 10);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Grid container spacing={2} sx={{my: 2, alignItems: "center", justifyContent: "center"}}>
                <Grid size={1}/>
                <Grid size={2}>
                    <Typography variant={"h1"}> {time.getHours().toString().padStart(2, '0')} </Typography>
                </Grid>
                <Grid size={1}>
                    <Typography variant={"h1"}> : </Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant={"h1"}> {time.getMinutes().toString().padStart(2, '0')} </Typography>
                </Grid>
                <Grid size={1}>
                    <Typography variant={"h1"}> : </Typography>
                </Grid>
                <Grid size={2}>
                    <Typography
                        sx={{color: getColor(time)}}
                        variant={"h1"}
                    >
                        {time.getSeconds().toString().padStart(2, '0')}
                    </Typography>
                </Grid>
                <Grid size={1}>
                    <Typography variant={"h1"}> : </Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant={"h1"}>
                        {Math.floor(time.getMilliseconds() / 10).toString().padStart(2, '0')}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}
