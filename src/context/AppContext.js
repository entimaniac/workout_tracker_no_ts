import React, {createContext, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import produce from "immer"

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const generateId = () => {
        return uuidv4();
    }
    const initialState = {
        workouts: {},
        activeWorkout: {id: generateId(), exercises: {exerciseList: {}}}
    }

    const [appData, setAppData] = useState(localStorage.getItem("appData") || initialState);

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

    const addWorkout = () => {
        setAppData(
            produce((draft) => {
                let e = createNewWorkout();
                draft.workouts.workoutList[e.id] = e
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

    const updateWorkouts = (workoutId, field, value) => {
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
        addExercise, deleteExercise, updateExercise,
        addSet, deleteSet, updateSet
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}