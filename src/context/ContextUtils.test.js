import {
  calculateWorkingMax,
  createLiftProfiles,
  createNewWorkout,
  formatWeight,
  roundToNearestFive,
} from "./ContextUtils";

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

  expect(bench.oneRepMaxSnapshot).toBe(185);
  expect(bench.workingMaxSnapshot).toBe(166.5);
  expect(benchSetWeights).toEqual([110, 125, 140]);
});

test("formatWeight preserves clean display values", () => {
  expect(formatWeight(202.5)).toBe("202.5");
  expect(formatWeight(185)).toBe("185");
});
