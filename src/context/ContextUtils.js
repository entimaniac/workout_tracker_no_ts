import {v4 as uuidv4} from 'uuid';

export const generateId = () => {
    return uuidv4();
}

export const createNewWorkout = () => {
    let exercise = createNewExercise();
    return {id: generateId(), name: "New Workout", exercises: {exerciseList: {[exercise.id]: exercise}}}
}

export const createNewExercise = () => {
    let set = createNewSet();
    return {id: generateId(), name: "New Exercise", sets: {setList: {[set.id]: set}}}
}

export const createNewSet = () => {
    return {id: generateId(), reps: 10, weight: 45}
}

export const initialState = () => {
    let workout = createNewWorkout()
    return {
        workouts: {workoutList: {[workout.id]: workout}},
        activeWorkout: workout
    }
}


