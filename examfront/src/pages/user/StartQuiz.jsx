// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getQuestionsOfQuizForTest } from '../../services/operations/questionAPI';
// import Swal from 'sweetalert2';
// import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Typography } from '@mui/material';
// export const StartQuiz = () => {

//   const navigate = useNavigate();
//   const {quizId} = useParams();
//   const {token} = useSelector((state) => state.auth)
//   const [questions, setQuestions] = useState([])
//   const [givenAnswer, setGivenAnswer] = useState('');
//   const [marksGot, setMarksGot] = useState(0);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [attempted, setAttempted] = useState(0);
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     // Prevent users from navigating back during the quiz using useNavigate
//     const preventBackNavigation = () => {
//       navigate(window.location.pathname, { replace: true });
//     };

//     // Add the event listener on mount
//     window.addEventListener('popstate', preventBackNavigation);

//     // Remove the event listener on cleanup
//     return () => window.removeEventListener('popstate', preventBackNavigation);
//   }, [navigate]);  // Include navigate as a dependency

  
 
//   const handleInputChange = (event) => {
//     setGivenAnswer(event.target.value);
//   };

//   const getFormattedTime = () => {
//     let mm = Math.floor(timer / 60);
//     let ss = timer - mm * 60;
//     return `${mm} min : ${ss} sec`;
//   };

  
//   const loadQuestions = () => {
//     getQuestionsOfQuizForTest(quizId, token)
//       .then(res => {
//         setQuestions(res);
//         setTimer(res.length * 2 * 60);
//         startTimer();
//       })
//       .catch(error => {
//         console.log(error);
//         // Handle error
//       });
//   };

//   useEffect(() => {
//     loadQuestions();
//   }, []);

//   const submitQuiz = () => {
//     Swal.fire({
//       title: 'Do you want to submit the quiz?',
//       showCancelButton: true,
//       confirmButtonText: `Submit`,
//       icon: 'info',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         evalQuiz();
//       }
//     });
//   };

//   const startTimer = () => {
//     const t = setInterval(() => {
//       if (timer <= 0) {
//         clearInterval(t);
//         evalQuiz();
//       } else {
//         setTimer(prevTimer => prevTimer - 1);
//       }
//     }, 1000);
//   };

//   const evalQuiz = () => {
//     // Mocking quiz evaluation
//     // Replace this with actual logic to evaluate quiz
//     let marksGot = 0;
//     let correctAnswers = 0;
//     let attempted = 0;

//     questions.forEach(q => {
//       if (givenAnswer === q.answer) {
//         correctAnswers++;
//         marksGot += q.quiz.maxMarks / questions.length;
//       }
//       if (givenAnswer.trim() !== '') {
//         attempted++;
//       }
//     });

//     setMarksGot(marksGot);
//     setCorrectAnswers(correctAnswers);
//     setAttempted(attempted);
//     setIsSubmit(true);
//   };


//   return (
//     <>
//       {!isSubmit ? (
//         <div className="mx-auto p-2">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="md:w-2/12">
//               <h3 className="text-lg font-bold">Instructions</h3>
//             </div>
//             <div className="md:w-8/12">
//             <h1 className="mt-5 mb-4">On Going Quiz <b>{questions.length > 0 && questions[0].quiz.title}</b></h1>
//               {questions.map((q, i) => (
//                 <Card key={i} className='mt-4' >
//                   <CardContent>
//                     <Typography variant="h6">
//                       <b>Q {i + 1})</b> <span className="ml-2" dangerouslySetInnerHTML={{ __html: q.content }}></span>
//                     </Typography>
//                     <Divider className="my-4" />
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <input type="radio" value={q.option1} onChange={handleInputChange} name={i} />
//                         {q.option1}
//                       </div>
//                       <div>
//                         <input type="radio" value={q.option2} onChange={handleInputChange} name={i} />
//                         {q.option2}
//                       </div>
//                       <div>
//                         <input type="radio" value={q.option3} onChange={handleInputChange} name={i} />
//                         {q.option3}
//                       </div>
//                       <div>
//                         <input type="radio" value={q.option4} onChange={handleInputChange} name={i} />
//                         {q.option4}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//               <div className="container text-center mt-4 mb-8">
//                 <Button variant="contained" color="primary" onClick={submitQuiz}>
//                   Submit Quiz
//                 </Button>
//               </div>
//             </div>
//             <div className="w-2/12 ">
//               <Card className="mt-8">
//                 <CardHeader title="Progress" subheader="Quiz will automatically submitted when timer reaches to 0:0" />
//                 <CardContent>
//                   <Typography variant="h4" className="text-center">{getFormattedTime()}</Typography>
//                   <CircularProgress variant="determinate" color="primary" style={{ margin: 'auto' }} value={(timer / (questions.length * 2 * 60)) * 100} />
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="container mx-auto mt-8">
//           <div className="flex justify-center">
//             <div className="w-full md:w-2/3">
//               <Card>
//                 <CardHeader title="Quiz Result" />
//                 <CardContent className="text-center">
//                   <Typography variant="h4">Marks Got: {marksGot}</Typography>
//                   <Typography variant="h4">Correct Answers: {correctAnswers}</Typography>
//                   <Typography variant="h4">Questions Attempted: {attempted}</Typography>
//                 </CardContent>
//                 <CardActions className="text-center">
//                   <Button variant="contained" color="primary">Print</Button>
//                   <Button variant="contained" color="secondary" onClick={() => navigate('/user/0')}>Home</Button>
//                 </CardActions>
//               </Card>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestionsOfQuizForTest } from '../../services/operations/questionAPI';
import Swal from 'sweetalert2';
import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Typography } from '@mui/material';

export const StartQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [questions, setQuestions] = useState([]);
  const [marksGot, setMarksGot] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const preventBackNavigation = () => {
      navigate(window.location.pathname, { replace: true });
    };
    window.addEventListener('popstate', preventBackNavigation);

    return () => window.removeEventListener('popstate', preventBackNavigation);
  }, [navigate]);

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index].givenAnswer = value;
    setQuestions(newQuestions);
  };

  const getFormattedTime = () => {
    let mm = Math.floor(timer / 60);
    let ss = timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  };

  const loadQuestions = () => {
    getQuestionsOfQuizForTest(quizId, token)
      .then((res) => {
        setQuestions(res);
        setTimer(res.length * 2 * 60);
        startTimer();
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const submitQuiz = () => {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        evalQuiz();
      }
    });
  };

  const startTimer = () => {
    const t = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(t);
          evalQuiz();
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
  };

  const evalQuiz = () => {
    let marksGot = 0;
    let correctAnswers = 0;
    let attempted = 0;

    questions.forEach((q) => {
      if (q.givenAnswer === q.answer) {
        correctAnswers++;
        marksGot += q.quiz.maxMarks / questions.length;
      }
      if (q.givenAnswer.trim() !== '') {
        attempted++;
      }
    });

    setMarksGot(marksGot);
    setCorrectAnswers(correctAnswers);
    setAttempted(attempted);
    setIsSubmit(true);
  };

  return (
    <>
      {!isSubmit ? (
        <div className="mx-auto p-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/12">
              <h3 className="text-lg font-bold">Instructions</h3>
            </div>
            <div className="md:w-8/12">
              {questions.length > 0 && (
                <>
                  <h1 className="mt-5 mb-4">On Going Quiz <b>{questions[0].quiz.title}</b></h1>
                  {questions.map((q, i) => (
                    <Card key={i} className="mt-4">
                      <CardContent>
                        <Typography variant="h6">
                          <b>Q {i + 1})</b> <span className="ml-2" dangerouslySetInnerHTML={{ __html: q.content }}></span>
                        </Typography>
                        <Divider className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <input
                              type="radio"
                              value={q.option1}
                              checked={q.givenAnswer === q.option1}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            {q.option1}
                          </div>
                          <div>
                            <input
                              type="radio"
                              value={q.option2}
                              checked={q.givenAnswer === q.option2}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            {q.option2}
                          </div>
                          <div>
                            <input
                              type="radio"
                              value={q.option3}
                              checked={q.givenAnswer === q.option3}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            {q.option3}
                          </div>
                          <div>
                            <input
                              type="radio"
                              value={q.option4}
                              checked={q.givenAnswer === q.option4}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            {q.option4}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="container text-center mt-4 mb-8">
                    <Button variant="contained" color="primary" onClick={submitQuiz}>
                      Submit Quiz
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="w-2/12 ">
              <Card className="mt-8">
                <CardHeader title="Progress" subheader="Quiz will automatically be submitted when the timer reaches 0:0" />
                <CardContent>
                  <Typography variant="h4" className="text-center">{getFormattedTime()}</Typography>
                  <div className='flex items-center justify-center'>
                    <CircularProgress variant="determinate" size={100} color="primary" thickness={5} style={{ margin: 'auto' }} value={(timer / (questions.length * 2 * 60)) * 100} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-8">
          <div className="flex justify-center">
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader title="Quiz Result" />
                <CardContent className="text-center">
                  <Typography variant="h4">Marks Got: {marksGot}</Typography>
                  <Typography variant="h4">Correct Answers: {correctAnswers}</Typography>
                  <Typography variant="h4">Questions Attempted: {attempted}</Typography>
                </CardContent>
                <CardActions className="flex items-center justify-center">
                  <Button variant="contained" color="primary">Print</Button>
                  <Button variant="contained" color="secondary" onClick={() => navigate('/user/0')}>Home</Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
