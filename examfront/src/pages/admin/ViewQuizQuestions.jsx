import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getQuestionsOfQuiz } from '../../services/operations/questionAPI'
import { Button, Card, CardActions, CardContent, Container, Divider, Grid, Typography } from '@mui/material'

export const ViewQuizQuestions = () => {

    const { qId } = useParams()
    const { title } = useParams()
    const [questions, setQuestions] = useState([])
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    async function fetchQuestionsByQuizId(qId, token) {

        try {
            const res = await getQuestionsOfQuiz(qId, token)
            setQuestions(res)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    useEffect(() => {
        fetchQuestionsByQuizId(qId, token)
    }, [qId, token])

    console.log("Questions: ", questions)

    return (
        <div>
            <h1 className='text-3xl'> Questions of {title} </h1>
            <Container>
                <Grid container spacing={2}>
                    <div className='mx-auto mt-6'>
                        <Button color='primary' onClick={()=> navigate(`/admin/addQuestion/${qId}/${title}`)} variant='contained'>Add Questions</Button>
                    </div>
                    {questions.map((q, index) => (
                        <Grid item xs={12} key={q.quesId}>
                            <Card variant="outlined" sx={{ mt: 2 }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Q {index + 1})
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: q.content }} />
                                    <Container sx={{ mt: 2 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography variant="body1">
                                                    <b>1)</b> {q.option1}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body1">
                                                    <b>2)</b> {q.option2}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body1">
                                                    <b>3)</b> {q.option3}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body1">
                                                    <b>4)</b> {q.option4}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                    <Divider sx={{ mt: 2 }} />
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        <b>Correct Answer:</b> {q.answer}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button color="error">
                                        Delete
                                    </Button>
                                    <Button color="primary">Update</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}
