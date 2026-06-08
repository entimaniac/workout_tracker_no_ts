import React, { createContext, useEffect, useState } from "react";
import { produce } from "immer";
import {
  createNewExercise,
  createNewSet,
  createNewWorkout,
  initialState,
} from "./ContextUtils";

export const AppContext = createContext();

const loadStoredValue = (key, fallback) => {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
        return fallback;
    }

    try {
        return JSON.parse(rawValue);
    } catch (error) {
        console.error(`Unable to parse stored value for ${key}.`, error);
        return fallback;
    }
}

export const AppContextProvider = ({ children }) => {
    const [appData, setAppData] = useState(() => loadStoredValue("appData", initialState()));
    const [openExerciseManagementModal, setOpenExerciseManagementModal] = useState(false);
    const [openAppDataManagementModal, setOpenAppDataManagementModal] = useState(false);
    const [uniqueExercises, setUniqueExercises] = useState(() => loadStoredValue("uniqueExercises", []));

    useEffect(() => {
        localStorage.setItem("appData", JSON.stringify(appData));
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
            {children}
        </AppContext.Provider>
    )
}
