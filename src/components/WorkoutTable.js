import React, {useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export const WorkoutTable = () => {
	const initialExercises = [
		{name:"Bicep Curl", weight:45, sets:[10,11,12]},
		{name:"Bench", weight:100, sets:[14,11,12]},
		{name:"Squat", weight:100, sets:[10,15,12]},
	]
	const [exercises, setExcercises] = useState([])

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{minWidth: 650}} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Weight</TableCell>
							<TableCell>Reps</TableCell>
							<TableCell>Total Reps</TableCell>
							<TableCell>Total Weight</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow
							sx={{'&:last-child td, &:last-child th': {border: 0}}}
						>
							<TableCell>Bicep Curl</TableCell>
							<TableCell>45</TableCell>
							<TableCell>10</TableCell>
							<TableCell>10l</TableCell>
							<TableCell>450</TableCell>
						</TableRow>

						{/*{rows.map((row) => (*/}
						{/*	<TableRow*/}
						{/*		key={row.name}*/}
						{/*		sx={{'&:last-child td, &:last-child th': {border: 0}}}*/}
						{/*	>*/}
						{/*		<TableCell component="th" scope="row">*/}
						{/*			{row.name}*/}
						{/*		</TableCell>*/}
						{/*		<TableCell align="right">{row.calories}</TableCell>*/}
						{/*		<TableCell align="right">{row.fat}</TableCell>*/}
						{/*		<TableCell align="right">{row.carbs}</TableCell>*/}
						{/*		<TableCell align="right">{row.protein}</TableCell>*/}
						{/*	</TableRow>*/}
						{/*))}*/}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

