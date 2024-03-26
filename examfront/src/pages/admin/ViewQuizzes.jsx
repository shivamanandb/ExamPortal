import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { deleteQuiz, getAllQuizzes } from '../../services/operations/quizAPI'
import { Card, CardHeader, Avatar, CardContent, CardActions, Button } from '@mui/material';
import examLogo from '../../assets/exam.png'
import { useNavigate } from 'react-router-dom';

export const ViewQuizzes = () => {
    
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState([])
  const {token} = useSelector((state) => state.auth)

  const getQuizzes = async () => {
      const toastId = toast.loading("loading...")
      try {
          const res = await getAllQuizzes(token)
          setQuizzes(res)
          toast.success("All Quizzes Fetched")
      } catch(error) {
          console.log("Error:", error)
          toast.error("Something went wrong")
      }

      toast.dismiss(toastId)
  }

  const deleteQuizAndUpdateState = async (quizId) => {
      const toastId = toast.loading("loading...")
      try {
          await deleteQuiz(quizId, token)
          // Remove the deleted quiz from the state
          setQuizzes(quizzes.filter(quiz => quiz.qId !== quizId))
          toast.success("Quiz Deleted Successfully")
      } catch(error) {
          console.log("Error:", error)
          toast.error("Something went wrong")
      }
      toast.dismiss(toastId)
  }

  useEffect(() => {
      getQuizzes(token)
  },[])

return (
  <div>
    {quizzes.map((q, index) => (
      <Card key={index} className='mb-4'>
        <CardHeader
          avatar={<Avatar src={examLogo} alt="No Image"/>}
          title={q?.title}
          subheader={q?.category?.title}
        />
        <CardContent className='mt-[-30px]'>
          {q?.description}
        </CardContent>
        <CardActions>
        <Button type='submit' onClick={()=>navigate(`/admin/viewQuestions/${q.qId}/${q.title}`)}  variant="contained" color="success">
          Questions
        </Button>
        <Button type='submit' className='normal-case'   variant="outlined" color="success">
          Max Marks: {q.maxMarks}
        </Button>
        <Button type='submit'  variant="outlined" color="success">
          Questions: {q.numberOfQuestions}
        </Button>
        <Button type='submit' onClick={()=>navigate(`/admin/updateQuiz/${q.qId}`)}  variant="contained" color="success">
          Update
        </Button>
        <Button type='submit'  variant="contained" color="success">
          Attempts
        </Button>
        <Button type='submit' onClick={() => deleteQuizAndUpdateState(q.qId)}  variant="contained" color="error">
          Delete
        </Button>
        </CardActions>
      </Card>
      
    ))}
    <div className='flex items-center justify-center'>
    <Button  type='submit' onClick={()=>{navigate("/admin/addQuiz")}}  variant="contained" color="primary">
          Add New Quiz
        </Button>
    </div>
  </div>
  
)
}
