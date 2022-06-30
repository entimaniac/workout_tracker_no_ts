import React, {createContext, useEffect, useState} from "react";
import produce from "immer"
import {createNewExercise, createNewSet, createNewWorkout, initialState} from "./ContextUtils";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [appData, setAppData] = useState(JSON.parse(localStorage.getItem("appData")) || initialState);

    const saveState = () => {
        localStorage.setItem("appData", JSON.stringify(appData));
    }

    useEffect(() => {
        saveState()
    }, [appData]);


    const setActiveWorkout = (workoutId) => {
        setAppData(
            produce((draft) => {
                // save state of active workout into the workout lists (pass by reference doesn't seem to work, or more
                // probably it's not the 'react' way, and we are modifying state incorrectly and nothing
                // is saving/re-rendering..
                draft.workouts.workoutList[draft.activeWorkout.id] = appData.activeWorkout;
                draft.activeWorkout = draft.workouts.workoutList[workoutId];
            })
        )
    }

    const addWorkout = () => {
        setAppData(
            produce((draft) => {
                let workout = createNewWorkout();
                draft.workouts.workoutList[workout.id] = workout
                draft.workouts.workoutList[draft.activeWorkout.id] = appData.activeWorkout;
                draft.activeWorkout = workout;
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

    const updateActiveWorkout = (field, value) => {
        setAppData(
            produce((draft) => {
                draft.activeWorkout[field] = value;
            })
        )
        updateWorkout(appData.activeWorkout.id, field, value);
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

    const updateExercise = (exerciseId, field, value) => {
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
        appData, setAppData,
        setActiveWorkout, addWorkout, deleteWorkout, updateWorkout, updateActiveWorkout,
        addExercise, deleteExercise, updateExercise,
        addSet, deleteSet, updateSet
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}