import React, { createContext, useContext, useEffect } from "react";
import { produce } from "immer";
import {
  DEFAULT_SPLIT_ID,
  DEFAULT_WEEK_KEY,
  LIFT_ORDER,
  SPLIT_DEFINITIONS,
  WEEK_DEFINITIONS,
  WEEK_ORDER,
  createAccessoryExercise,
  createAccessoryLibraryExercise,
  calculateSetPercentage,
  createExtraMainSet,
  createAccessorySet,
  createMaxLogEntry,
  createNewWorkout,
  findAccessoryLibraryExerciseByName,
  formatWeight,
  getAccessoryExercises,
  getAccessoryLibraryExercises,
  getMainExercises,
  getSuggestedAccessoryExercises,
  initialState,
  normalizeAppData,
  rebuildMainExercises,
  syncMainExerciseWithLiftProfile,
} from "./ContextUtils";
import { usePersistentState } from "./usePersistentState";

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const [storedAppData, setAppData] = usePersistentState("appData", initialState);
  const appData = normalizeAppData(storedAppData);

  useEffect(() => {
    if (!storedAppData?.exerciseLibrary) {
      setAppData(appData);
    }
  }, [appData, setAppData, storedAppData]);

  const setActiveWorkout = (workoutId) => {
    setAppData(
      produce((draft) => {
        draft.activeWorkoutId = workoutId;
      })
    );
  };

  const addWorkout = (
    splitId = DEFAULT_SPLIT_ID,
    weekKey = DEFAULT_WEEK_KEY
  ) => {
    setAppData(
      produce((draft) => {
        const workout = createNewWorkout({
          splitId,
          weekKey,
          liftProfiles: draft.liftProfiles,
        });

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
          const workout = createNewWorkout({
            splitId: DEFAULT_SPLIT_ID,
            weekKey: DEFAULT_WEEK_KEY,
            liftProfiles: draft.liftProfiles,
          });

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

  const updateWorkoutWeek = (workoutId, weekKey) => {
    setAppData(
      produce((draft) => {
        const workout = draft.workouts.workoutList[workoutId];

        draft.workouts.workoutList[workoutId] = rebuildMainExercises(
          workout,
          draft.liftProfiles,
          weekKey
        );
      })
    );
  };

  const addExercise = (name = "New Accessory") => {
    setAppData(
      produce((draft) => {
        const exercise = createAccessoryExercise(name);
        draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[
          exercise.id
        ] = exercise;
      })
    );
  };

  const addExerciseFromLibrary = (exerciseId) => {
    setAppData(
      produce((draft) => {
        draft.exerciseLibrary = draft.exerciseLibrary || appData.exerciseLibrary;
        const libraryExercise = draft.exerciseLibrary?.exerciseList?.[exerciseId];

        if (!libraryExercise) {
          return;
        }

        const exercise = createAccessoryExercise(libraryExercise.name);
        draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[
          exercise.id
        ] = exercise;
      })
    );
  };

  const createCustomAccessoryExercise = (name) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    setAppData(
      produce((draft) => {
        draft.exerciseLibrary = draft.exerciseLibrary || appData.exerciseLibrary;
        const existingLibraryExercise = findAccessoryLibraryExerciseByName(
          draft.exerciseLibrary,
          trimmedName
        );

        const libraryExercise =
          existingLibraryExercise ||
          createAccessoryLibraryExercise({
            name: trimmedName,
          });

        draft.exerciseLibrary.exerciseList[libraryExercise.id] = libraryExercise;

        const exercise = createAccessoryExercise(libraryExercise.name);
        draft.workouts.workoutList[draft.activeWorkoutId].exercises.exerciseList[
          exercise.id
        ] = exercise;
      })
    );
  };

  const deleteExercise = (exerciseId) => {
    setAppData(
      produce((draft) => {
        const workout =
          draft.workouts.workoutList[draft.activeWorkoutId].exercises
            .exerciseList;
        const exercise = workout[exerciseId];

        if (!exercise || exercise.type === "main") {
          return;
        }

        delete workout[exerciseId];
      })
    );
  };

  const updateExercise = (exerciseId, field, value, workoutId = null) => {
    setAppData(
      produce((draft) => {
        const targetWorkoutId = workoutId || draft.activeWorkoutId;
        const exercise =
          draft.workouts.workoutList[targetWorkoutId].exercises.exerciseList[
            exerciseId
          ];

        if (!exercise || exercise.type === "main") {
          return;
        }

        exercise[field] = value;
      })
    );
  };

  const addSet = (exerciseId) => {
    setAppData(
      produce((draft) => {
        const exercise =
          draft.workouts.workoutList[draft.activeWorkoutId].exercises
            .exerciseList[exerciseId];

        if (!exercise) {
          return;
        }

        if (exercise.type === "main") {
          const existingSets = Object.values(exercise.sets.setList);
          const sourceSet = existingSets[existingSets.length - 1];

          if (!sourceSet) {
            return;
          }

          const set = createExtraMainSet(sourceSet, exercise.workingMaxSnapshot);
          exercise.sets.setList[set.id] = set;
          return;
        }

        const set = createAccessorySet();
        exercise.sets.setList[set.id] = set;
      })
    );
  };

  const deleteSet = (exerciseId, setId) => {
    setAppData(
      produce((draft) => {
        const exercise =
          draft.workouts.workoutList[draft.activeWorkoutId].exercises
            .exerciseList[exerciseId];

        if (!exercise) {
          return;
        }

        if (exercise.type === "main" && !exercise.sets.setList[setId]?.isExtra) {
          return;
        }

        delete exercise.sets.setList[setId];
      })
    );
  };

  const updateSet = (exerciseId, setId, field, value) => {
    setAppData(
      produce((draft) => {
        const exercise =
          draft.workouts.workoutList[draft.activeWorkoutId].exercises
            .exerciseList[exerciseId];

        if (!exercise) {
          return;
        }

        exercise.sets.setList[setId][field] = value;

        const set = exercise.sets.setList[setId];

        if (exercise.type === "main" && set?.isExtra && field === "weight") {
          set.percentage = calculateSetPercentage(value, exercise.workingMaxSnapshot);
        }
      })
    );
  };

  const toggleSetComplete = (exerciseId, setId) => {
    setAppData(
      produce((draft) => {
        const exercise =
          draft.workouts.workoutList[draft.activeWorkoutId].exercises
            .exerciseList[exerciseId];

        if (!exercise?.sets?.setList?.[setId]) {
          return;
        }

        exercise.sets.setList[setId].isComplete =
          !exercise.sets.setList[setId].isComplete;
      })
    );
  };

  const updateLiftMax = (liftId, oneRepMax) => {
    const parsedMax = Number(oneRepMax);

    if (!Number.isFinite(parsedMax) || parsedMax <= 0) {
      return;
    }

    setAppData(
      produce((draft) => {
        const liftProfile = draft.liftProfiles[liftId];

        if (!liftProfile || liftProfile.oneRepMax === parsedMax) {
          return;
        }

        liftProfile.oneRepMax = parsedMax;
        liftProfile.log.push(createMaxLogEntry(parsedMax));

        Object.values(draft.workouts.workoutList).forEach((workout) => {
          Object.entries(workout.exercises.exerciseList).forEach(
            ([exerciseId, exercise]) => {
              if (exercise.type !== "main" || exercise.liftId !== liftId) {
                return;
              }

              workout.exercises.exerciseList[exerciseId] =
                syncMainExerciseWithLiftProfile(exercise, liftProfile);
            }
          );
        });
      })
    );
  };

  const workoutList = appData.workouts.workoutList;
  const activeWorkout = workoutList[appData.activeWorkoutId];
  const mainExercises = getMainExercises(activeWorkout);
  const accessoryExercises = getAccessoryExercises(activeWorkout);
  const accessoryLibraryExercises = getAccessoryLibraryExercises(
    appData.exerciseLibrary
  );
  const suggestedAccessoryExercises = getSuggestedAccessoryExercises(
    appData.exerciseLibrary,
    activeWorkout?.splitId
  );

  const contextValue = {
    appData,
    setAppData,
    activeWorkoutId: appData.activeWorkoutId,
    activeWorkout,
    workoutList,
    liftProfiles: appData.liftProfiles,
    accessoryLibraryExercises,
    suggestedAccessoryExercises,
    mainExercises,
    accessoryExercises,
    splitDefinitions: SPLIT_DEFINITIONS,
    weekDefinitions: WEEK_DEFINITIONS,
    weekOrder: WEEK_ORDER,
    liftOrder: LIFT_ORDER,
    setActiveWorkout,
    addWorkout,
    deleteWorkout,
    updateWorkout,
    updateWorkoutWeek,
    addExercise,
    addExerciseFromLibrary,
    createCustomAccessoryExercise,
    deleteExercise,
    updateExercise,
    addSet,
    deleteSet,
    updateSet,
    toggleSetComplete,
    updateLiftMax,
    formatWeight,
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
