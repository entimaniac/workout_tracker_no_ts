import React, {createContext, useEffect, useState} from "react";
import produce from "immer"
import {createNewExercise, createNewSet, createNewWorkout, initialState} from "./ContextUtils";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [appData, setAppData] = useState(JSON.parse(localStorage.getItem("appData")) || initialState);
    const [openExerciseManagementModal, setOpenExerciseManagementModal] = useState(false);
    const [openAppDataManagementModal, setOpenAppDataManagementModal] = useState(false);
    const [uniqueExercises, setUniqueExercises] = useState(JSON.parse(localStorage.getItem("uniqueExercises")) || []);


    const saveState = () => {
        localStorage.setItem("appData", JSON.stringify(appData));
    }

    useEffect(() => {
        saveState()
    }, [appData]);


    const setActiveWorkout = (workoutId) => {
        setAppData(
            produce((draft) => {
                draft.activeWorkoutId = workoutId;
            })
        )
    }

    const addWorkout = () => {
        setAppData(
            produce((draft) => {
                let workout = createNewWorkout();
                draft.workouts.workoutList[workout.id] = workout
                draft.activeWorkoutId = workout.id;
            })
        )
    }

    const deleteWorkout = (workoutId) => {
        setAppData(
            produce((draft) => {
                console.log(workoutId)
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
                draft.workouts.workoutList[draft.activeWorkoutId][field] = value;
            })
        )
        updateWorkout(appData.activeWorkoutId, field, value);
    }

    const addExercise = () => {
        setAppData(
            produce((draft) => {
                let e = createNewExercise();
                draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[e.id] = e
            })
        )
    }

    const deleteExercise = (exerciseId) => {
        setAppData(
            produce((draft) => {
                delete draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[exerciseId];
            })
        )
    }

    const updateExercise = (exerciseId, field, value, workoutId=null) => {
        setAppData(
            produce((draft) => {
                draft.workouts.workoutList[workoutId || draft.activeWorkoutId].exercises.exerciseList[exerciseId][field] = value;
            })
        )
    }

    const addSet = (exerciseId) => {
        setAppData(
            produce((draft) => {
                let set = createNewSet();
                draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[exerciseId].sets.setList[set.id] = set
            })
        )

    }

    const deleteSet = (exerciseId, setId) => {
        setAppData(
            produce((draft) => {
                delete draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[exerciseId].sets.setList[setId];
            })
        )
    }

    const updateSet = (exerciseId, setId, field, value) => {
        setAppData(
            produce((draft) => {
                draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[exerciseId].sets.setList[setId][field] = value
            })
        )
    }

    const contextValue = {
        appData, setAppData,
        activeWorkoutId: appData.activeWorkoutId,
        workoutList: appData.workouts.workoutList,
        openExerciseManagementModal, setOpenExerciseManagementModal,
        openAppDataManagementModal, setOpenAppDataManagementModal,
        uniqueExercises, setUniqueExercises,
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