import { v4 as uuidv4 } from "uuid";

export const DEFAULT_WEEK_KEY = "5s";
export const DEFAULT_SPLIT_ID = "split1";
export const WEEK_ORDER = ["5s", "3s", "531"];

export const LIFT_ORDER = [
  "benchPress",
  "squat",
  "deadlift",
  "overheadPress",
];

export const LIFT_DEFINITIONS = {
  benchPress: {
    id: "benchPress",
    name: "Bench Press",
    defaultOneRepMax: 162,
  },
  squat: {
    id: "squat",
    name: "Squat",
    defaultOneRepMax: 170,
  },
  deadlift: {
    id: "deadlift",
    name: "Deadlift",
    defaultOneRepMax: 213,
  },
  overheadPress: {
    id: "overheadPress",
    name: "Overhead Press",
    defaultOneRepMax: 101,
  },
};

export const SPLIT_DEFINITIONS = {
  split1: {
    id: "split1",
    name: "Split 1",
    description: "Bench Press + Squat",
    mainLiftIds: ["benchPress", "squat"],
  },
  split2: {
    id: "split2",
    name: "Split 2",
    description: "Deadlift + Overhead Press",
    mainLiftIds: ["deadlift", "overheadPress"],
  },
};

export const ACCESSORY_LIBRARY_DEFINITIONS = [
  {
    id: "dips",
    name: "Dips",
    category: "push",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
  {
    id: "pushUps",
    name: "Push-Ups",
    category: "push",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
  {
    id: "dumbbellBenchPress",
    name: "Dumbbell Bench Press",
    category: "push",
    splitIds: ["split1"],
    isSuggested: true,
  },
  {
    id: "dumbbellInclinePress",
    name: "Dumbbell Incline Press",
    category: "push",
    splitIds: ["split1"],
    isSuggested: true,
  },
  {
    id: "closeGripBenchPress",
    name: "Close Grip Bench Press",
    category: "push",
    splitIds: ["split1"],
    isSuggested: true,
  },
  {
    id: "dumbbellPress",
    name: "Dumbbell Press",
    category: "push",
    splitIds: ["split2"],
    isSuggested: true,
  },
  {
    id: "chinUps",
    name: "Chin-Ups",
    category: "pull",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
  {
    id: "pullUps",
    name: "Pull-Ups",
    category: "pull",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
  {
    id: "dumbbellRow",
    name: "Dumbbell Row",
    category: "pull",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
  {
    id: "barbellRow",
    name: "Barbell Row",
    category: "pull",
    splitIds: ["split1"],
    isSuggested: true,
  },
  {
    id: "tBarRow",
    name: "T-Bar Row",
    category: "pull",
    splitIds: ["split1"],
    isSuggested: true,
  },
  {
    id: "latPulldown",
    name: "Lat Pulldown",
    category: "pull",
    splitIds: ["split2"],
    isSuggested: true,
  },
  {
    id: "facePull",
    name: "Face Pull",
    category: "pull",
    splitIds: ["split2"],
    isSuggested: true,
  },
  {
    id: "bandPullApart",
    name: "Band Pull-Apart",
    category: "pull",
    splitIds: ["split2"],
    isSuggested: true,
  },
  {
    id: "barbellCurl",
    name: "Barbell Curl",
    category: "arms",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
  {
    id: "tricepsPushdown",
    name: "Triceps Pushdown",
    category: "arms",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
  {
    id: "lunges",
    name: "Lunges",
    category: "singleLeg",
    splitIds: ["split1"],
    isSuggested: true,
  },
  {
    id: "stepUps",
    name: "Step-Ups",
    category: "singleLeg",
    splitIds: ["split1"],
    isSuggested: true,
  },
  {
    id: "bulgarianSplitSquat",
    name: "Bulgarian Split Squat",
    category: "singleLeg",
    splitIds: ["split1"],
    isSuggested: true,
  },
  {
    id: "legPress",
    name: "Leg Press",
    category: "lowerBody",
    splitIds: ["split1"],
    isSuggested: true,
  },
  {
    id: "frontSquat",
    name: "Front Squat",
    category: "lowerBody",
    splitIds: ["split2"],
    isSuggested: true,
  },
  {
    id: "romanianDeadlift",
    name: "Romanian Deadlift",
    category: "posteriorChain",
    splitIds: ["split2"],
    isSuggested: true,
  },
  {
    id: "goodMorning",
    name: "Good Morning",
    category: "posteriorChain",
    splitIds: ["split2"],
    isSuggested: true,
  },
  {
    id: "backRaise",
    name: "Back Raise",
    category: "posteriorChain",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
  {
    id: "reverseHyper",
    name: "Reverse Hyper",
    category: "posteriorChain",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
  {
    id: "abWheel",
    name: "Ab Wheel",
    category: "core",
    splitIds: ["split1", "split2"],
    isSuggested: true,
  },
];

export const ACCESSORY_CATEGORY_LABELS = {
  push: "Push",
  pull: "Pull",
  arms: "Arms",
  singleLeg: "Single Leg",
  lowerBody: "Lower Body",
  posteriorChain: "Posterior Chain",
  core: "Core",
  custom: "Custom",
};

export const WEEK_DEFINITIONS = {
  "5s": {
    id: "5s",
    name: "Week 1",
    description: "5s Week",
    shortLabel: "5s",
    sets: [
      { percentage: 65, prescribedReps: "5" },
      { percentage: 75, prescribedReps: "5" },
      { percentage: 85, prescribedReps: "5+" },
    ],
  },
  "3s": {
    id: "3s",
    name: "Week 2",
    description: "3s Week",
    shortLabel: "3s",
    sets: [
      { percentage: 70, prescribedReps: "3" },
      { percentage: 80, prescribedReps: "3" },
      { percentage: 90, prescribedReps: "3+" },
    ],
  },
  "531": {
    id: "531",
    name: "Week 3",
    description: "5/3/1 Week",
    shortLabel: "5/3/1",
    sets: [
      { percentage: 75, prescribedReps: "5" },
      { percentage: 85, prescribedReps: "3" },
      { percentage: 95, prescribedReps: "1+" },
    ],
  },
};

export const generateId = () => {
  return uuidv4();
};

const normalizeAccessoryName = (name = "") => {
  return name.trim().toLowerCase();
};

export const roundToNearestFive = (weight) => {
  const numericWeight = Number(weight) || 0;

  return Math.round(numericWeight / 5) * 5;
};

export const calculateWorkingMax = (oneRepMax) => {
  const numericMax = Number(oneRepMax) || 0;

  return Number((numericMax * 0.9).toFixed(1));
};

export const calculateSetPercentage = (weight, workingMax) => {
  const numericWeight = Number(weight);
  const numericWorkingMax = Number(workingMax);

  if (
    !Number.isFinite(numericWeight) ||
    !Number.isFinite(numericWorkingMax) ||
    numericWorkingMax <= 0
  ) {
    return 0;
  }

  return Number(((numericWeight / numericWorkingMax) * 100).toFixed(1));
};

export const calculateEstimatedOneRepMax = (weight, reps) => {
  const numericWeight = Number(weight);
  const numericReps = Number(reps);

  if (
    !Number.isFinite(numericWeight) ||
    !Number.isFinite(numericReps) ||
    numericWeight <= 0 ||
    numericReps <= 0
  ) {
    return null;
  }

  if (numericReps === 1) {
    return numericWeight;
  }

  return Number((numericWeight * (1 + numericReps / 30)).toFixed(1));
};

export const formatWeight = (weight) => {
  if (!Number.isFinite(Number(weight))) {
    return "0";
  }

  const numericWeight = Number(weight);

  return Number.isInteger(numericWeight)
    ? numericWeight.toString()
    : numericWeight.toFixed(1);
};

export const formatPercentage = (percentage) => {
  if (!Number.isFinite(Number(percentage))) {
    return "-";
  }

  const numericPercentage = Number(percentage);

  return Number.isInteger(numericPercentage)
    ? `${numericPercentage}%`
    : `${numericPercentage.toFixed(1)}%`;
};

const parsePrescribedReps = (prescribedReps) => {
  return Number.parseInt(prescribedReps, 10) || 0;
};

export const getWeekDefinition = (weekKey) => {
  return WEEK_DEFINITIONS[weekKey] || WEEK_DEFINITIONS[DEFAULT_WEEK_KEY];
};

export const getSplitDefinition = (splitId) => {
  return SPLIT_DEFINITIONS[splitId] || SPLIT_DEFINITIONS[DEFAULT_SPLIT_ID];
};

export const getLiftDefinition = (liftId) => {
  return LIFT_DEFINITIONS[liftId];
};

export const createMaxLogEntry = (oneRepMax, dateCreated = new Date()) => {
  return {
    id: generateId(),
    oneRepMax: Number(oneRepMax),
    dateCreated,
  };
};

export const createLiftProfile = (liftId) => {
  const lift = getLiftDefinition(liftId);

  return {
    id: lift.id,
    name: lift.name,
    oneRepMax: lift.defaultOneRepMax,
    log: [],
  };
};

export const createLiftProfiles = () => {
  return LIFT_ORDER.reduce((liftProfiles, liftId) => {
    liftProfiles[liftId] = createLiftProfile(liftId);
    return liftProfiles;
  }, {});
};

export const createMainSet = ({
  percentage,
  prescribedReps,
  workingMax,
  isExtra = false,
  dateCreated = new Date(),
}) => {
  return {
    id: generateId(),
    percentage,
    prescribedReps,
    reps: parsePrescribedReps(prescribedReps),
    weight: roundToNearestFive(workingMax * (percentage / 100)),
    isComplete: false,
    isExtra,
    dateCreated,
  };
};

export const createAccessorySet = (dateCreated = new Date()) => {
  return {
    id: generateId(),
    prescribedReps: null,
    reps: 10,
    weight: 45,
    isComplete: false,
    dateCreated,
  };
};

export const createAccessoryLibraryExercise = ({
  id = generateId(),
  name,
  category = "custom",
  splitIds = [],
  isSuggested = false,
  origin = "custom",
  dateCreated = new Date(),
}) => {
  return {
    id,
    name,
    category,
    splitIds,
    isSuggested,
    origin,
    dateCreated,
  };
};

export const createAccessoryLibrary = () => {
  const exerciseList = ACCESSORY_LIBRARY_DEFINITIONS.reduce(
    (nextExerciseList, definition) => {
      nextExerciseList[definition.id] = createAccessoryLibraryExercise({
        ...definition,
        origin: "core",
      });
      return nextExerciseList;
    },
    {}
  );

  return { exerciseList };
};

export const mergeAccessoryLibrary = (exerciseLibrary) => {
  const coreLibrary = createAccessoryLibrary().exerciseList;
  const existingLibrary = exerciseLibrary?.exerciseList || {};

  return {
    exerciseList: {
      ...coreLibrary,
      ...existingLibrary,
    },
  };
};

const normalizeSetCompletion = (set) => {
  return {
    ...set,
    isComplete: Boolean(set?.isComplete),
    isExtra: Boolean(set?.isExtra),
  };
};

const normalizeWorkouts = (workouts) => {
  const workoutList = Object.entries(workouts?.workoutList || {}).reduce(
    (nextWorkoutList, [workoutId, workout]) => {
      const exerciseList = Object.entries(workout?.exercises?.exerciseList || {}).reduce(
        (nextExerciseList, [exerciseId, exercise]) => {
          const setList = Object.entries(exercise?.sets?.setList || {}).reduce(
            (nextSetList, [setId, set]) => {
              nextSetList[setId] = normalizeSetCompletion(set);
              return nextSetList;
            },
            {}
          );

          nextExerciseList[exerciseId] = {
            ...exercise,
            sets: {
              ...exercise.sets,
              setList,
            },
          };
          return nextExerciseList;
        },
        {}
      );

      nextWorkoutList[workoutId] = {
        ...workout,
        exercises: {
          ...workout.exercises,
          exerciseList,
        },
      };
      return nextWorkoutList;
    },
    {}
  );

  return {
    ...workouts,
    workoutList,
  };
};

export const normalizeAppData = (appData) => {
  return {
    ...appData,
    exerciseLibrary: mergeAccessoryLibrary(appData?.exerciseLibrary),
    workouts: normalizeWorkouts(appData?.workouts),
  };
};

export const getAccessoryLibraryExercises = (exerciseLibrary) => {
  return Object.values(exerciseLibrary?.exerciseList || {}).sort((left, right) =>
    left.name.localeCompare(right.name)
  );
};

export const getSuggestedAccessoryExercises = (exerciseLibrary, splitId) => {
  return getAccessoryLibraryExercises(exerciseLibrary).filter((exercise) => {
    if (!exercise.isSuggested) {
      return false;
    }

    return exercise.splitIds.length === 0 || exercise.splitIds.includes(splitId);
  });
};

export const findAccessoryLibraryExerciseByName = (exerciseLibrary, name) => {
  const normalizedName = normalizeAccessoryName(name);

  return getAccessoryLibraryExercises(exerciseLibrary).find((exercise) => {
    return normalizeAccessoryName(exercise.name) === normalizedName;
  });
};

export const createMainExercise = ({
  liftId,
  weekKey,
  liftProfiles,
  dateCreated = new Date(),
}) => {
  const lift = getLiftDefinition(liftId);
  const liftProfile = liftProfiles[liftId];
  const workingMax = calculateWorkingMax(liftProfile.oneRepMax);
  const week = getWeekDefinition(weekKey);

  const setList = week.sets.reduce((sets, setDefinition) => {
    const nextSet = createMainSet({
      ...setDefinition,
      workingMax,
      dateCreated,
    });

    sets[nextSet.id] = nextSet;
    return sets;
  }, {});

  return {
    id: generateId(),
    type: "main",
    liftId,
    name: lift.name,
    dateCreated,
    oneRepMaxSnapshot: Number(liftProfile.oneRepMax),
    workingMaxSnapshot: workingMax,
    sets: { setList },
  };
};

export const createExtraMainSet = (set, workingMax, dateCreated = new Date()) => {
  const weight = Number(set?.weight) || 0;

  return {
    ...set,
    id: generateId(),
    percentage: calculateSetPercentage(weight, workingMax),
    prescribedReps: null,
    reps: Number(set?.reps) || parsePrescribedReps(set?.prescribedReps),
    weight,
    isComplete: false,
    isExtra: true,
    dateCreated,
  };
};

export const syncMainExerciseWithLiftProfile = (exercise, liftProfile) => {
  const workingMax = calculateWorkingMax(liftProfile.oneRepMax);
  const setList = Object.entries(exercise?.sets?.setList || {}).reduce(
    (nextSetList, [setId, set]) => {
      nextSetList[setId] = set.isComplete
        ? set
        : {
            ...set,
            percentage: set.isExtra
              ? calculateSetPercentage(set.weight, workingMax)
              : set.percentage,
            prescribedReps: set.isExtra ? null : set.prescribedReps,
            reps: set.isExtra
              ? set.reps
              : parsePrescribedReps(set.prescribedReps),
            weight: set.isExtra
              ? set.weight
              : roundToNearestFive(workingMax * ((set.percentage || 0) / 100)),
          };
      return nextSetList;
    },
    {}
  );

  return {
    ...exercise,
    oneRepMaxSnapshot: Number(liftProfile.oneRepMax),
    workingMaxSnapshot: workingMax,
    sets: {
      ...exercise.sets,
      setList,
    },
  };
};

export const createAccessoryExercise = (
  name = "New Accessory",
  dateCreated = new Date()
) => {
  const set = createAccessorySet(dateCreated);

  return {
    id: generateId(),
    type: "accessory",
    name,
    dateCreated,
    sets: { setList: { [set.id]: set } },
  };
};

export const createWorkoutName = (splitId, weekKey) => {
  const split = getSplitDefinition(splitId);
  const week = getWeekDefinition(weekKey);

  return `${split.name} ${week.shortLabel}`;
};

export const createNewWorkout = ({
  splitId = DEFAULT_SPLIT_ID,
  weekKey = DEFAULT_WEEK_KEY,
  liftProfiles,
  dateCreated = new Date(),
} = {}) => {
  const split = getSplitDefinition(splitId);
  const exerciseList = {};

  for (const liftId of split.mainLiftIds) {
    const exercise = createMainExercise({
      liftId,
      weekKey,
      liftProfiles,
      dateCreated,
    });

    exerciseList[exercise.id] = exercise;
  }

  return {
    id: generateId(),
    name: createWorkoutName(splitId, weekKey),
    splitId,
    weekKey,
    dateCreated,
    exercises: { exerciseList },
  };
};

export const rebuildMainExercises = (workout, liftProfiles, weekKey) => {
  const accessoryExercises = Object.values(
    workout.exercises.exerciseList || {}
  ).filter((exercise) => exercise.type === "accessory");

  const refreshedWorkout = createNewWorkout({
    splitId: workout.splitId,
    weekKey,
    liftProfiles,
    dateCreated: workout.dateCreated,
  });

  const mergedExerciseList = { ...refreshedWorkout.exercises.exerciseList };

  for (const accessory of accessoryExercises) {
    mergedExerciseList[accessory.id] = accessory;
  }

  return {
    ...workout,
    weekKey,
    name: createWorkoutName(workout.splitId, weekKey),
    exercises: { exerciseList: mergedExerciseList },
  };
};

export const getWorkoutExercises = (workout) => {
  return Object.values(workout?.exercises?.exerciseList || {});
};

export const getMainExercises = (workout) => {
  return getWorkoutExercises(workout).filter((exercise) => exercise.type === "main");
};

export const getAccessoryExercises = (workout) => {
  return getWorkoutExercises(workout).filter(
    (exercise) => exercise.type === "accessory"
  );
};

export const initialState = () => {
  const liftProfiles = createLiftProfiles();
  const workout = createNewWorkout({
    splitId: DEFAULT_SPLIT_ID,
    weekKey: DEFAULT_WEEK_KEY,
    liftProfiles,
  });

  return {
    liftProfiles,
    exerciseLibrary: createAccessoryLibrary(),
    workouts: { workoutList: { [workout.id]: workout } },
    activeWorkoutId: workout.id,
  };
};
