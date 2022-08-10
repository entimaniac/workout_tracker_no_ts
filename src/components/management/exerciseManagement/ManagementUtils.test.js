import {extractExercises, findUniqueExercises} from "./ManagementUtils";

const mockList = [
    {
        "id": "abc",
        "name": "exercise 1",
        "dateCreated": "2022-07-08T12:07:48.623Z",
        "sets": {
            "setList": {}
        }

    },
    {
        "id": "def",
        "name": "exercise 1",
        "dateCreated": "2022-07-08T12:07:48.623Z",
        "sets": {
            "setList": {}
        }
    },
    {
        "id": "ghi",
        "name": "exercise 2",
        "dateCreated": "2022-07-08T12:07:48.623Z",
        "sets": {
            "setList": {}
        }
    }
]


const appData = {
    "workouts": {
    "workoutList": {
        "8af9e2b0-3281-4212-8833-8954431b5888": {
            "id": "8af9e2b0-3281-4212-8833-8954431b5888",
                "name": "test3",
                "dateCreated": "2022-07-08T12:07:48.623Z",
                "exercises": {
                "exerciseList": {
                    "b8f5055f-9c8c-425d-9749-35c463ad82bd": {
                        "id": "b8f5055f-9c8c-425d-9749-35c463ad82bd",
                            "name": "New Exercise",
                            "dateCreated": "2022-07-08T12:07:48.623Z",
                            "sets": {
                            "setList": {}
                        },
                        "workoutId": "8af9e2b0-3281-4212-8833-8954431b5888"
                    },
                    "372d83fb-1007-44a1-b43c-27c800e5b304": {
                        "id": "372d83fb-1007-44a1-b43c-27c800e5b304",
                            "name": "Air Squats",
                            "dateCreated": "2022-07-29T22:44:58.988Z",
                            "sets": {
                            "setList": {
                                "0b38430b-131c-45c0-a147-a61090c8ed39": {
                                    "id": "0b38430b-131c-45c0-a147-a61090c8ed39",
                                        "reps": 10,
                                        "weight": 45,
                                        "dateCreated": "2022-07-29T22:44:58.988Z"
                                }
                            }
                        }
                    },
                    "692ef5be-3434-4cf0-9570-dbe5b72b51e4": {
                        "id": "692ef5be-3434-4cf0-9570-dbe5b72b51e4",
                            "name": "FAKE123",
                            "dateCreated": "2022-07-29T22:50:27.456Z",
                            "sets": {
                            "setList": {
                                "423f3c25-7665-4de1-8078-3a2e26cee55c": {
                                    "id": "423f3c25-7665-4de1-8078-3a2e26cee55c",
                                        "reps": 10,
                                        "weight": 45,
                                        "dateCreated": "2022-07-29T22:50:27.456Z"
                                }
                            }
                        }
                    }
                }
            }
        },
        "b9712de7-511f-485f-a8f4-e110c9a6f7b0": {
            "id": "b9712de7-511f-485f-a8f4-e110c9a6f7b0",
                "name": "testin",
                "dateCreated": "2022-07-08T12:09:57.766Z",
                "exercises": {
                "exerciseList": {
                    "cfcea046-5af7-4059-a216-1865f94e6669": {
                        "id": "cfcea046-5af7-4059-a216-1865f94e6669",
                            "name": "New Exercise",
                            "dateCreated": "2022-07-08T12:09:57.766Z",
                            "sets": {
                            "setList": {
                                "59938bc8-ad5c-47e7-b7e2-ae17baef1236": {
                                    "id": "59938bc8-ad5c-47e7-b7e2-ae17baef1236",
                                        "reps": 10,
                                        "weight": 45,
                                        "dateCreated": "2022-07-08T12:09:57.766Z"
                                }
                            }
                        },
                        "workoutId": "b9712de7-511f-485f-a8f4-e110c9a6f7b0"
                    }
                }
            }
        },
        "f60a2279-07c6-49a2-91c6-d54c49a27284": {
            "id": "f60a2279-07c6-49a2-91c6-d54c49a27284",
                "name": "2022.07.28",
                "dateCreated": "2022-07-28T21:13:15.424Z",
                "exercises": {
                "exerciseList": {
                    "183c004a-b0ce-43a6-9142-99397288b40f": {
                        "id": "183c004a-b0ce-43a6-9142-99397288b40f",
                            "name": "Pushups",
                            "dateCreated": "2022-07-28T21:13:15.424Z",
                            "sets": {
                            "setList": {
                                "135c992b-c4e0-44d1-8361-714960a3e875": {
                                    "id": "135c992b-c4e0-44d1-8361-714960a3e875",
                                        "reps": "12",
                                        "weight": "1",
                                        "dateCreated": "2022-07-28T21:13:15.424Z"
                                }
                            }
                        },
                        "workoutId": "f60a2279-07c6-49a2-91c6-d54c49a27284"
                    },
                    "3ab71734-5ec7-4898-a538-3451e24b5301": {
                        "id": "3ab71734-5ec7-4898-a538-3451e24b5301",
                            "name": "Bicep Curl w/ Zbar",
                            "dateCreated": "2022-07-28T21:49:55.156Z",
                            "sets": {
                            "setList": {
                                "c143712e-b5cd-4c72-84a9-1a30988fb896": {
                                    "id": "c143712e-b5cd-4c72-84a9-1a30988fb896",
                                        "reps": 10,
                                        "weight": 45,
                                        "dateCreated": "2022-07-28T21:49:55.156Z"
                                },
                                "8763a5de-12f3-4bf9-abef-458077509bb6": {
                                    "id": "8763a5de-12f3-4bf9-abef-458077509bb6",
                                        "reps": "12",
                                        "weight": 45,
                                        "dateCreated": "2022-07-28T22:07:33.054Z"
                                },
                                "b11fc878-d98f-4714-8ab9-9edaba2487ab": {
                                    "id": "b11fc878-d98f-4714-8ab9-9edaba2487ab",
                                        "reps": "13",
                                        "weight": 45,
                                        "dateCreated": "2022-07-28T22:13:33.672Z"
                                }
                            }
                        },
                        "workoutId": "f60a2279-07c6-49a2-91c6-d54c49a27284"
                    },
                    "c3291cc1-b674-4f15-ad63-ead7a4d5b5fb": {
                        "id": "c3291cc1-b674-4f15-ad63-ead7a4d5b5fb",
                            "name": "Air Squats",
                            "dateCreated": "2022-07-28T22:07:49.640Z",
                            "sets": {
                            "setList": {
                                "ebd78da5-6709-4562-80b4-cc0d59f00c83": {
                                    "id": "ebd78da5-6709-4562-80b4-cc0d59f00c83",
                                        "reps": 10,
                                        "weight": "1",
                                        "dateCreated": "2022-07-28T22:07:49.640Z"
                                }
                            }
                        },
                        "workoutId": "f60a2279-07c6-49a2-91c6-d54c49a27284"
                    }
                }
            }
        },
        "8f415b4f-24aa-41e8-94b9-3ba3b3aa95d2": {
            "id": "8f415b4f-24aa-41e8-94b9-3ba3b3aa95d2",
                "name": "2022.07.29",
                "dateCreated": "2022-07-29T11:43:57.408Z",
                "exercises": {
                "exerciseList": {
                    "cc56aec4-74b6-42f7-a839-6fd90f7da502": {
                        "id": "cc56aec4-74b6-42f7-a839-6fd90f7da502",
                            "name": "Air Squats",
                            "dateCreated": "2022-07-29T12:52:47.162Z",
                            "sets": {
                            "setList": {
                                "a8cd5b5b-2072-4f73-adfa-d2242c5c24b9": {
                                    "id": "a8cd5b5b-2072-4f73-adfa-d2242c5c24b9",
                                        "reps": "13",
                                        "weight": "1",
                                        "dateCreated": "2022-07-29T12:52:47.162Z"
                                },
                                "627b8048-b2c5-4135-bd22-c8bea1fafd68": {
                                    "id": "627b8048-b2c5-4135-bd22-c8bea1fafd68",
                                        "reps": "15",
                                        "weight": "1",
                                        "dateCreated": "2022-07-29T19:08:49.782Z"
                                },
                                "a4641a7f-435e-4881-ac08-fc96eddef0e9": {
                                    "id": "a4641a7f-435e-4881-ac08-fc96eddef0e9",
                                        "reps": "17",
                                        "weight": "1",
                                        "dateCreated": "2022-07-29T21:09:41.151Z"
                                }
                            }
                        },
                        "workoutId": "8f415b4f-24aa-41e8-94b9-3ba3b3aa95d2"
                    }
                }
            }
        }
    }
},
    "activeWorkoutId": "8f415b4f-24aa-41e8-94b9-3ba3b3aa95d2"
}




test('findUniqueExercises can handle null inputs', () => {
    let result = findUniqueExercises(null);
    expect(result.size).toBe(0);
});


test('findUniqueExercises returns unique results', () => {
    let result = findUniqueExercises(mockList);
    expect(mockList.length).toBe(3);
    expect(result.length).toBe(2);
});


test('extractExercises returns all exercises', () => {
    let result = extractExercises(appData);
    expect(mockList.length).toBe(3);
    expect(result.length).toBe(2);
});
