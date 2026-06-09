import React, { createContext, useContext } from "react";
import { produce } from "immer";
import {
  createNewExercise,
  createNewSet,
  createNewWorkout,
  initialState,
} from "./ContextUtils";
import { usePersistentState } from "./usePersistentState";

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const [appData, setAppData] = usePersistentState("appData", initialState);

  const setActiveWorkout = (workoutId) => {
    setAppData(
      produce((draft) => {
        draft.activeWorkoutId = workoutId;
      })
    );
  };

  const addWorkout = () => {
    setAppData(
      produce((draft) => {
        const workout = createNewWorkout();
        draft.workouts.workoutList[workout.id] = workout;
        draft.activeWorkoutId = workout.id;
      })
    );
  };

  const deleteWorkout = (workoutId) => {
    setAppData(
      produce((draft) => {
        delete draft.workouts.workoutList[workoutId];

        const remainingWorkoutIds = Object.keys(draft.workouts.workoutList);

        if (remainingWorkoutIds.length === 0) {
          const workout = createNewWorkout();
          draft.workouts.workoutList[workout.id] = workout;
          draft.activeWorkoutId = workout.id;
          return;
        }

        if (draft.activeWorkoutId === workoutId) {
          draft.activeWorkoutId = remainingWorkoutIds[0];
        }
      })
    );
  };

  const updateWorkout = (workoutId, field, value) => {
    setAppData(
      produce((draft) => {
        draft.workouts.workoutList[workoutId][field] = value;
      })
    );
  };

  const addExercise = () => {
    setAppData(
      produce((draft) => {
        const exercise = createNewExercise();
        draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[
          exercise.id
        ] = exercise;
      })
    );
  };

  const deleteExercise = (exerciseId) => {
    setAppData(
      produce((draft) => {
        delete draft.workouts.workoutList[draft.activeWorkoutId].exercises
          .exerciseList[exerciseId];
      })
    );
  };

  const updateExercise = (exerciseId, field, value, workoutId = null) => {
    setAppData(
      produce((draft) => {
        draft.workouts.workoutList[
          workoutId || draft.activeWorkoutId
        ].exercises.exerciseList[exerciseId][field] = value;
      })
    );
  };

  const addSet = (exerciseId) => {
    setAppData(
      produce((draft) => {
        const set = createNewSet();
        draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[
          exerciseId
        ].sets.setList[set.id] = set;
      })
    );
  };

  const deleteSet = (exerciseId, setId) => {
    setAppData(
      produce((draft) => {
        delete draft.workouts.workoutList[draft.activeWorkoutId].exercises
          .exerciseList[exerciseId].sets.setList[setId];
      })
    );
  };

  const updateSet = (exerciseId, setId, field, value) => {
    setAppData(
      produce((draft) => {
        draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[
          exerciseId
        ].sets.setList[setId][field] = value;
      })
    );
  };

  const contextValue = {
    appData,
    setAppData,
    activeWorkoutId: appData.activeWorkoutId,
    workoutList: appData.workouts.workoutList,
    setActiveWorkout,
    addWorkout,
    deleteWorkout,
    updateWorkout,
    addExercise,
    deleteExercise,
    updateExercise,
    addSet,
    deleteSet,
    updateSet,
  };

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const contextValue = useContext(AppDataContext);

  if (!contextValue) {
    throw new Error("useAppData must be used within an AppDataProvider.");
  }

  return contextValue;
};
