import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {AppContext} from "../../context/AppContext";
import {DeleteConfirm} from "../shared/input/DeleteConfirm";

export const WorkoutList = () => {
    const {appData, setActiveWorkout} = React.useContext(AppContext);
    const workoutList = appData?.workouts?.workoutList;
    const handleDelete = () => {
        console.log("add functionality here plz")
    };
    return (
        <>
            {Object.values(workoutList)?.map((workout) => (
                <ListItem key={workout.id}>
                    <ListItemButton onClick={() => setActiveWorkout(workout.id)}>
                        <ListItemText primary={workout.name}/>
                    </ListItemButton>
                    <DeleteConfirm onClick={handleDelete}/>
                </ListItem>
            ))}
        </>
    );
}
