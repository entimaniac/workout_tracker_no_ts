import React, {createContext, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import produce from "immer"

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const initialState = {exercises: []}
    const [appData, setAppData] = useState(localStorage.getItem("appData") || initialState);

    const generateId = () => {
        return uuidv4();
    }

    const createNewExercise = () => {
        return {id: generateId(), name: "New Exercise", sets: [createNewSet()]}
    }

    const createNewSet = () => {
        return {id: generateId(), reps: 10, weight: 45}
    }

    const addExercise = () => {
        setAppData(
            produce((draft) => {
                draft.exercises.push(createNewExercise())
            })
        )
    }

    const updateExercise = (exerciseId, field, value) => {
        setAppData(
            produce((draft) => {
                draft.exercises.find((exercise) => exercise.id === exerciseId)[field] = value;
            })
        )
    }

    const addSet = (id) => {
        setAppData(
            produce((draft) => {
                const exercise = draft.exercises.find((exercise) => exercise.id === id).sets.push(createNewSet());
            })
        )

    }

    const updateSet = (exerciseId, setId, field, value) => {
        setAppData(
            produce((draft) => {
                const exercise = draft.exercises.find((exercise) => exercise.id === exerciseId);
                exercise.sets.find((set) => set.id === setId)[field] = value;
            })
        )
    }

    const contextValue = {
        appData, setAppData, generateId, addExercise, updateExercise, addSet, updateSet
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}