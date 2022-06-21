import React, {createContext, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import produce from "immer"

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const generateId = () => {
        return uuidv4();
    }

    // save/load state methods here


    const createNewWorkout = () => {
        let exercise = createNewExercise();
        return {id: generateId(), name: "New Workout", exercises: {exerciseList: {[exercise.id]: exercise}}}
    }

    const createNewExercise = () => {
        let set = createNewSet();
        return {id: generateId(), name: "New Exercise", sets: {setList: {[set.id]: set}}}
    }

    const createNewSet = () => {
        return {id: generateId(), reps: 10, weight: 45}
    }

    const initialState = () => {
        let workout = createNewWorkout()
        return {
            workouts: {workoutList: {[workout.id]: workout}},
            activeWorkout: workout
        }
    }

    const [appData, setAppData] = useState(localStorage.getItem("appData") || initialState);

    const setActiveWorkout = (workoutId) => {
        setAppData(
            produce((draft) => {
                // save state of active workout into the workout lists (pass by reference doesn't seem to work, or more
                // probably it's not the 'react' way, and we are modifying state incorrectly and nothing
                // is saving/re-rendering..
                draft.workouts.workoutList[draft.activeWorkout.id] = draft.activeWorkout;
                draft.activeWorkout = draft.workouts.workoutList[workoutId];
            })
        )
    }

    const addWorkout = () => {
        setAppData(
            produce((draft) => {
                let e = createNewWorkout();
                draft.workouts.workoutList[e.id] = e;
                draft.activeWorkout = e;
            })
        )
    }

    const deleteWorkout = (workoutId) => {
        setAppData(
            produce((draft) => {
                delete draft.workouts.workoutList[workoutId];
            })
        )
    }

    const updateWorkout = (workoutId, field, value) => {
        setAppData(
            produce((draft) => {
                draft.workouts.workoutList[workoutId][field] = value;
            })
        )
    }

    const addExercise = () => {
        setAppData(
            produce((draft) => {
                let e = createNewExercise();
                draft.activeWorkout.exercises.exerciseList[e.id] = e
            })
        )
    }

    const deleteExercise = (exerciseId) => {
        setAppData(
            produce((draft) => {
                delete draft.activeWorkout.exercises.exerciseList[exerciseId];
            })
        )
    }

    const updateExercise = (workoutId, exerciseId, field, value) => {
        setAppData(
            produce((draft) => {
                draft.activeWorkout.exercises.exerciseList[exerciseId][field] = value;
            })
        )
    }

    const addSet = (exerciseId) => {
        setAppData(
            produce((draft) => {
                let set = createNewSet();
                draft.activeWorkout.exercises.exerciseList[exerciseId].sets.setList[set.id] = set
            })
        )

    }

    const deleteSet = (exerciseId, setId) => {
        setAppData(
            produce((draft) => {
                delete draft.activeWorkout.exercises.exerciseList[exerciseId].sets.setList[setId];
            })
        )
    }

    const updateSet = (exerciseId, setId, field, value) => {
        setAppData(
            produce((draft) => {
                draft.activeWorkout.exercises.exerciseList[exerciseId].sets.setList[setId][field] = value
            })
        )
    }

    const contextValue = {
        appData, setAppData, generateId,
        setActiveWorkout, addWorkout, deleteWorkout, updateWorkout,
        addExercise, deleteExercise, updateExercise,
        addSet, deleteSet, updateSet
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}