import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { questionsEndPoints } from "../api";

const {GET_ALL_QUESTIONS_API, ADD_QUESTION_API} = questionsEndPoints

export async function getQuestionsOfQuiz(quizId, token) {

    let res = []
    const toastId = toast.loading("loading...")
    try {

        const response = await apiConnector("GET", GET_ALL_QUESTIONS_API + `${quizId}`, null, 
        {
            Authorization : `Bearer ${token}`
        })
        console.log("GET ALL QUESTIONS API RESPONSE..........", response)
        res = response?.data
        toast.success("Questions Fetched Successfully")

    } catch(error) {
        
        console.log("GET ALL QUESTIONS API ERROR..........", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
    return res
}

export async function addQuestion(data, token) {
    const toastId = toast.loading("loading...")

    try {

        const response = await apiConnector("POST", ADD_QUESTION_API, data, 
        {
            Authorization: `Bearer ${token}`
        })

        console.log("ADD QUESTION API RESPONSE..........", response)

        toast.success("Question Added Successfully")

    } catch(error) {

        console.log("ADD QUESTION API ERROR............", error)
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId)
}