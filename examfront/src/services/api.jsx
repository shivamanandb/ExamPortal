const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SIGNUP_API: BASE_URL + "/user/",
    LOGIN_API: BASE_URL + "/generate-token"
}

// PROFILE ENDPOINTS
export const profileEndPoints = {
    GET_USER_DETAILS_API: BASE_URL + "/current-user"
}

// CATEGORY ENDPOINTS
export const categoryEndPoints = {
    GET_CATEGORY_API: BASE_URL + "/category/",
    ADD_CATEGORY_API: BASE_URL + "/category/"
}

// QUIZZES ENDPOINTS
export const quizzesEndPoints = {
    GET_QUIZZES_API: BASE_URL + "/quiz/",
    ADD_QUIZ_API: BASE_URL + "/quiz/",
    DELETE_QUIZ_API: BASE_URL + "/quiz/",
    UPDATE_QUIZ_API: BASE_URL + "/quiz/",
    GET_QUIZ_API: BASE_URL + "/quiz/"
}

// QUESTIONS ENDPOINTS
export const questionsEndPoints = {
    GET_ALL_QUESTIONS_API: BASE_URL + "/question/quiz/all/",
    ADD_QUESTION_API: BASE_URL + "/question/"
}