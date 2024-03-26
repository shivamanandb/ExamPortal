import toast from "react-hot-toast"
import { quizzesEndPoints } from "../api"
import { apiConnector } from "../apiConnector"

let result = []
const {GET_QUIZZES_API, ADD_QUIZ_API, DELETE_QUIZ_API, UPDATE_QUIZ_API, GET_QUIZ_API} = quizzesEndPoints
export async function getAllQuizzes(token) {
    
    try {

        const response = await apiConnector("GET", GET_QUIZZES_API, null, {Authorization: `Bearer ${token}`})
        console.log("FETCH ALL QUIZZES API RESPONSE..........", response)
        result = response?.data

    } catch(error) {
        console.log("FETCH ALL QUIZZES API ERROR............", error)
    }
    return result
}

export async function addQuiz(data, token) {
    const toastId = toast.loading("loading...")

    try {

        const response = await apiConnector("POST", ADD_QUIZ_API, data, 
        {
            Authorization: `Bearer ${token}`
        })

        console.log("ADD QUIZ API RESPONSE..........", response)

        toast.success("Quiz Added Successfully")

    } catch(error) {

        console.log("ADD QUIZ API ERROR............", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)

}

export async function deleteQuiz(quizId, token) {
    
    const toastId = toast.loading("loading...")

    try {

        const response = await apiConnector("DELETE", DELETE_QUIZ_API+`${quizId}`, null, 
        {
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE QUIZ API RESPONSE..........", response)
        toast.success("Quiz Deleted Successfully")

    } catch(error) {

        console.log("DELETE QUIZ API ERROR............", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
}

export async function getQuiz(quizId, token) {

    let res = []
    try {

        const response = await apiConnector("GET", GET_QUIZ_API + quizId, null, 
        {
            Authorization: `Bearer ${token}`
        })
        console.log("GET QUIZ API RESPONSE..........", response)
        res = response?.data

    } catch(error) {

        console.log("GET QUIZ API ERROR............", error)
        alert("Something went wrong")
    }
    return res
}

export async function updateQuiz(quizId, data, token, navigate) {

    data.qId = quizId
    const toastId = toast.loading("loading...")

    try {

        const response = await apiConnector("PUT", UPDATE_QUIZ_API, data, 
        {
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE QUIZ API RESPONSE..........", response)
        toast.success("Quiz Updated Successfully")
        navigate("/admin/quizzes")

    } catch(error) {

        console.log("UPDATE QUIZ API ERROR............", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
}
