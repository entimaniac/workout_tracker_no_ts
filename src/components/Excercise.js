import React from 'react';
import {Box, Typography} from "@mui/material";
import {ExerciseField} from "./ExerciseField";

export const Exercise = () => {
	return (
		<>
			<Box sx={{display: 'flex'}}>
				<ExerciseField> <Typography> name field </Typography> </ExerciseField>
				<ExerciseField> <Typography> weight </Typography> </ExerciseField>
				<ExerciseField> <Typography> set1 reps </Typography> </ExerciseField>
				<ExerciseField> <Typography> set2 reps </Typography> </ExerciseField>
				<ExerciseField> <Typography> total reps </Typography> </ExerciseField>
				<ExerciseField> <Typography> total weight </Typography> </ExerciseField>

			</Box>
		</>
	);
}

