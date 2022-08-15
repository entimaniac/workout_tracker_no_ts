import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {AppContext} from "../../context/AppContext";
import {DeleteConfirm} from "../shared/input/DeleteConfirm";
import {getDateString} from "../../utils/DateUtils";

export const WorkoutList = () => {
    const {workoutList, deleteWorkout, setActiveWorkout} = React.useContext(AppContext);

    const handleDelete = (workoutId) => {
        deleteWorkout(workoutId)
    };

    return (
        <>
            {Object.values(workoutList)?.map((workout) => (
                <ListItem key={workout.id}>
                    <ListItemButton onClick={() => setActiveWorkout(workout.id)}>
                        <ListItemText primary={getDateString(workout.dateCreated)}/>
                    </ListItemButton>
                    <DeleteConfirm onClick={() => handleDelete(workout.id)}/>
                </ListItem>
            ))}
        </>
    );
}
