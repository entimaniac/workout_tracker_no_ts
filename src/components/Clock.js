import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";

export const Clock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		setInterval(() => setTime(new Date()), 10);
	}, []);


	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="center" sx={{my: 2}}>
				<Grid item xs={1}/>
				<Grid item xs={2}>
					<Typography variant={"h1"}> {time.getHours().toString().padStart(2, '0')} </Typography>
				</Grid>
				<Grid item xs={1}>
					<Typography variant={"h1"}> : </Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography variant={"h1"}> {time.getMinutes().toString().padStart(2, '0')} </Typography>
				</Grid>
				<Grid item xs={1}>
					<Typography variant={"h1"}> : </Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography variant={"h1"}> {time.getSeconds().toString().padStart(2, '0')} </Typography>
				</Grid>
				<Grid item xs={1}>
					<Typography variant={"h1"}> : </Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography variant={"h1"}>
						{Math.floor(time.getMilliseconds() / 10).toString().padStart(2, '0')}
					</Typography>
				</Grid>
			</Grid>
		</>
	);
}

