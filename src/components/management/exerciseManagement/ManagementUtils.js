export const findUniqueExercises = (allExerciseList) => {
    if (!allExerciseList) {
        return new Set()
    }
    return [...new Set(allExerciseList?.map(item => item.name))];
}


export const extractExercises = (appData) => {
    if (!appData) {
        return []
    }
    let list = []
    for (const workout of Object.values(appData?.workouts?.workoutList)) {
        for (const ex of Object.values(workout?.exercises?.exerciseList)) {
            let cloned = structuredClone(ex)
            cloned.workoutId = workout.id
            list.push(cloned)
        }
    }
    return list
}


