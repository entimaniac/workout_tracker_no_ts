import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {AppContext} from "../../context/AppContext";

export const WorkoutList = () => {
    const {appData, setActiveWorkout} = React.useContext(AppContext);
    const workoutList = appData?.workouts?.workoutList;

    return (
        <>
            {Object.values(workoutList)?.map((workout) => (
                <ListItem key={workout.id}>
                    <ListItemButton onClick={() => setActiveWorkout(workout.id)}>
                        <ListItemText primary={workout.name}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </>
    );
}
