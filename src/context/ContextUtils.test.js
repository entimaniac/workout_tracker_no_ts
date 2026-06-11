import {
  calculateSetPercentage,
  createAccessoryLibrary,
  createExtraMainSet,
  createMainExercise,
  calculateEstimatedOneRepMax,
  calculateWorkingMax,
  createLiftProfiles,
  createNewWorkout,
  formatWeight,
  getSuggestedAccessoryExercises,
  normalizeAppData,
  roundToNearestFive,
  syncMainExerciseWithLiftProfile,
} from "./ContextUtils";

test("calculateEstimatedOneRepMax uses an Epley estimate", () => {
  expect(calculateEstimatedOneRepMax(185, 5)).toBe(215.8);
  expect(calculateEstimatedOneRepMax(225, 1)).toBe(225);
  expect(calculateEstimatedOneRepMax(0, 5)).toBeNull();
});

test("calculateSetPercentage derives the set percentage from weight", () => {
  expect(calculateSetPercentage(180, 200)).toBe(90);
  expect(calculateSetPercentage(185, 202.5)).toBe(91.4);
});

test("calculateWorkingMax returns 90 percent of 1RM", () => {
  expect(calculateWorkingMax(225)).toBe(202.5);
});

test("roundToNearestFive rounds working weights for main lifts", () => {
  expect(roundToNearestFive(172.125)).toBe(170);
  expect(roundToNearestFive(184.275)).toBe(185);
});

test("createNewWorkout builds split 1 with bench and squat working sets", () => {
  const liftProfiles = createLiftProfiles();
  const workout = createNewWorkout({
    splitId: "split1",
    weekKey: "5s",
    liftProfiles,
  });

  const exercises = Object.values(workout.exercises.exerciseList);
  const exerciseNames = exercises.map((exercise) => exercise.name);

  expect(exerciseNames).toEqual(["Bench Press", "Squat"]);

  const bench = exercises.find((exercise) => exercise.name === "Bench Press");
  const benchSetWeights = Object.values(bench.sets.setList).map(
    (set) => set.weight
  );

  expect(bench.oneRepMaxSnapshot).toBe(162);
  expect(bench.workingMaxSnapshot).toBe(145.8);
  expect(benchSetWeights).toEqual([95, 110, 125]);
});

test("new sets start incomplete by default", () => {
  const liftProfiles = createLiftProfiles();
  const exercise = createMainExercise({
    liftId: "benchPress",
    weekKey: "5s",
    liftProfiles,
  });

  const setList = Object.values(exercise.sets.setList);

  expect(setList.every((set) => set.isComplete === false)).toBe(true);
});

test("createExtraMainSet marks added main sets as extra and incomplete", () => {
  const liftProfiles = createLiftProfiles();
  const exercise = createMainExercise({
    liftId: "benchPress",
    weekKey: "5s",
    liftProfiles,
  });
  const sourceSet = Object.values(exercise.sets.setList)[2];
  const extraSet = createExtraMainSet(sourceSet, exercise.workingMaxSnapshot);

  expect(extraSet.id).not.toBe(sourceSet.id);
  expect(extraSet.isExtra).toBe(true);
  expect(extraSet.isComplete).toBe(false);
  expect(extraSet.weight).toBe(sourceSet.weight);
  expect(extraSet.percentage).toBe(85.7);
  expect(extraSet.prescribedReps).toBeNull();
});

test("createLiftProfiles starts with no logged max history", () => {
  const liftProfiles = createLiftProfiles();

  expect(liftProfiles.benchPress.log).toEqual([]);
  expect(liftProfiles.squat.log).toEqual([]);
});

test("createAccessoryLibrary includes core 5/3/1-style accessories", () => {
  const library = createAccessoryLibrary();
  const accessoryNames = Object.values(library.exerciseList).map(
    (exercise) => exercise.name
  );

  expect(accessoryNames).toContain("Dips");
  expect(accessoryNames).toContain("Dumbbell Row");
  expect(accessoryNames).toContain("Ab Wheel");
});

test("getSuggestedAccessoryExercises filters suggestions by split", () => {
  const library = createAccessoryLibrary();

  const split1Suggestions = getSuggestedAccessoryExercises(library, "split1").map(
    (exercise) => exercise.name
  );
  const split2Suggestions = getSuggestedAccessoryExercises(library, "split2").map(
    (exercise) => exercise.name
  );

  expect(split1Suggestions).toContain("Dumbbell Incline Press");
  expect(split1Suggestions).toContain("Lunges");
  expect(split2Suggestions).toContain("Good Morning");
  expect(split2Suggestions).toContain("Face Pull");
  expect(split1Suggestions).not.toContain("Good Morning");
});

test("normalizeAppData adds the accessory library to older saved data", () => {
  const liftProfiles = createLiftProfiles();
  const workout = createNewWorkout({
    splitId: "split1",
    weekKey: "5s",
    liftProfiles,
  });

  const normalizedAppData = normalizeAppData({
    liftProfiles,
    workouts: { workoutList: { [workout.id]: workout } },
    activeWorkoutId: workout.id,
  });

  expect(normalizedAppData.exerciseLibrary.exerciseList.dips.name).toBe("Dips");
});

test("syncMainExerciseWithLiftProfile updates only unfinished main sets", () => {
  const liftProfiles = createLiftProfiles();
  const exercise = createMainExercise({
    liftId: "deadlift",
    weekKey: "3s",
    liftProfiles,
  });
  const setList = Object.values(exercise.sets.setList);
  const completedSet = setList[0];
  const unfinishedSet = setList[1];

  completedSet.isComplete = true;
  completedSet.reps = 7;
  completedSet.weight = 250;

  const updatedExercise = syncMainExerciseWithLiftProfile(exercise, {
    ...liftProfiles.deadlift,
    oneRepMax: 405,
  });
  const updatedSets = Object.values(updatedExercise.sets.setList);

  expect(updatedExercise.oneRepMaxSnapshot).toBe(405);
  expect(updatedExercise.workingMaxSnapshot).toBe(364.5);
  expect(updatedSets[0].reps).toBe(7);
  expect(updatedSets[0].weight).toBe(250);
  expect(updatedSets[1].reps).toBe(3);
  expect(updatedSets[1].weight).toBe(290);
  expect(updatedSets[2].weight).toBe(330);
  expect(updatedSets[1].isComplete).toBe(false);
  expect(unfinishedSet.weight).toBe(155);
});

test("syncMainExerciseWithLiftProfile preserves extra set weight and recalculates percentage", () => {
  const liftProfiles = createLiftProfiles();
  const exercise = createMainExercise({
    liftId: "deadlift",
    weekKey: "3s",
    liftProfiles,
  });
  const sourceSet = Object.values(exercise.sets.setList)[2];
  const extraSet = createExtraMainSet(sourceSet, exercise.workingMaxSnapshot);

  extraSet.weight = 300;
  exercise.sets.setList[extraSet.id] = extraSet;

  const updatedExercise = syncMainExerciseWithLiftProfile(exercise, {
    ...liftProfiles.deadlift,
    oneRepMax: 405,
  });
  const updatedExtraSet = updatedExercise.sets.setList[extraSet.id];

  expect(updatedExtraSet.weight).toBe(300);
  expect(updatedExtraSet.prescribedReps).toBeNull();
  expect(updatedExtraSet.percentage).toBe(82.3);
});

test("formatWeight preserves clean display values", () => {
  expect(formatWeight(202.5)).toBe("202.5");
  expect(formatWeight(185)).toBe("185");
});
