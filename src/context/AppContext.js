import React, {createContext, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import produce from "immer"

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const initialState = {exercises: {exerciseList: {}}}
    const [appData, setAppData] = useState(localStorage.getItem("appData") || initialState);

    // save/load state methods here

    const generateId = () => {
        return uuidv4();
    }

    const createNewExercise = () => {
        let set = createNewSet();
        return {id: generateId(), name: "New Exercise", sets: {setList: {[set.id]: set}}}
    }

    const createNewSet = () => {
        return {id: generateId(), reps: 10, weight: 45}
    }

    const addExercise = () => {
        setAppData(
            produce((draft) => {
                let e = createNewExercise();
                draft.exercises.exerciseList[e.id] = e
            })
        )
    }

    const deleteExercise = (exerciseId) => {
        setAppData(
            produce((draft) => {
                delete draft.exercises.exerciseList[exerciseId];
            })
        )
    }

    const updateExercise = (exerciseId, field, value) => {
        setAppData(
            produce((draft) => {
                draft.exercises.exerciseList[exerciseId][field] = value;
            })
        )
    }

    const addSet = (exerciseId) => {
        setAppData(
            produce((draft) => {
                let set = createNewSet();
                draft.exercises.exerciseList[exerciseId].sets.setList[set.id] = set
            })
        )

    }

    const deleteSet = (exerciseId, setId) => {
        setAppData(
            produce((draft) => {
                delete draft.exercises.exerciseList[exerciseId].sets.setList[setId];
            })
        )
    }

    const updateSet = (exerciseId, setId, field, value) => {
        setAppData(
            produce((draft) => {
                draft.exercises.exerciseList[exerciseId].sets.setList[setId][field] = value
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