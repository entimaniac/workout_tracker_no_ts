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
    defaultOneRepMax: 185,
  },
  squat: {
    id: "squat",
    name: "Squat",
    defaultOneRepMax: 225,
  },
  deadlift: {
    id: "deadlift",
    name: "Deadlift",
    defaultOneRepMax: 315,
  },
  overheadPress: {
    id: "overheadPress",
    name: "Overhead Press",
    defaultOneRepMax: 115,
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

export const roundToNearestFive = (weight) => {
  const numericWeight = Number(weight) || 0;

  return Math.round(numericWeight / 5) * 5;
};

export const calculateWorkingMax = (oneRepMax) => {
  const numericMax = Number(oneRepMax) || 0;

  return Number((numericMax * 0.9).toFixed(1));
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
    log: [createMaxLogEntry(lift.defaultOneRepMax)],
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
  dateCreated = new Date(),
}) => {
  return {
    id: generateId(),
    percentage,
    prescribedReps,
    reps: parsePrescribedReps(prescribedReps),
    weight: roundToNearestFive(workingMax * (percentage / 100)),
    dateCreated,
  };
};

export const createAccessorySet = (dateCreated = new Date()) => {
  return {
    id: generateId(),
    prescribedReps: null,
    reps: 10,
    weight: 45,
    dateCreated,
  };
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
    workouts: { workoutList: { [workout.id]: workout } },
    activeWorkoutId: workout.id,
  };
};
