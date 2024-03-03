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