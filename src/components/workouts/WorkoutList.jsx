import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {DeleteConfirm} from "../shared/input/DeleteConfirm";
import {getDateString} from "../../utils/DateUtils";
import { useAppData } from "../../context/AppDataContext";

export const WorkoutList = () => {
    const {workoutList, splitDefinitions, deleteWorkout, setActiveWorkout} = useAppData();

    const handleDelete = (workoutId) => {
        deleteWorkout(workoutId)
    };

    return (
        <>
            {Object.values(workoutList)?.map((workout) => (
                <ListItem key={workout.id}>
                    <ListItemButton onClick={() => setActiveWorkout(workout.id)}>
                        <ListItemText
                            primary={workout.name}
                            secondary={`${splitDefinitions[workout.splitId]?.description} • ${getDateString(workout.dateCreated)}`}
                        />
                    </ListItemButton>
                    <DeleteConfirm onClick={() => handleDelete(workout.id)}/>
                </ListItem>
            ))}
        </>
    );
}
