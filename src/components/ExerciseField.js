import React from 'react';
import {Box} from "@mui/material";

export const ExerciseField = (props) => {
	return (
		<>
			<Box sx={{m: 2}}>
				{props.children}
			</Box>
		</>
	);
}

