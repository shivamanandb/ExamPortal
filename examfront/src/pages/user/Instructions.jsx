import React from 'react';
import { Box, Typography, Card, CardHeader, CardContent, Divider, List, ListItem, ListItemText, Button, CardActions } from '@mui/material';

// Assuming you have a separate function to handle starting the quiz
function startQuiz() {
  // Implement your quiz starting logic here
  console.log('Starting quiz...');
}

function QuizInstructions({ quiz }) {
  return (
    <Box className="container mx-auto"> {/* Use Box instead of div for layout */}
      <Box className="flex justify-center">
        <Box className="w-full md:w-3/4 lg:w-1/2">
          <Card className="mt-20">
            <CardHeader
              title="Read the instructions of this page carefully"
              subheader="One step more to go"
            />
            <CardContent className="ml-20">
              <Typography variant="h4">{quiz.title}</Typography>
              <Typography variant="body1">{quiz.description}</Typography>
              <Divider className="my-4" />
              <Typography variant="h4">Important Instructions</Typography>
              <List> {/* Use List for semantic representation */}
                <ListItem>
                  <ListItemText primary="This quiz is only for practice purpose." />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`You have to submit quiz within ${quiz.numberOfQuestions * 2} Minutes.`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="You can attempt the quiz any number of times." />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`There are ${quiz.numberOfQuestions} questions in this quiz.`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Each question carries ${quiz.maxMarks / quiz.numberOfQuestions} marks. No negative marking for wrong ones.`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="All questions are of MCQ types." />
                </ListItem>
              </List>
              <Divider className="my-4" />
              <Typography variant="h4">Attempting Quiz</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Click Start Quiz button to start the quiz" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="The time will start the moment you click the Start Test button." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="You cannot resume this quiz if interrupted due to any reason." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Scroll down to move to the next question." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Click on Submit Quiz button on completion of the quiz." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Report of the test is automatically generated in the form of a PDF copy." />
                </ListItem>
              </List>
            </CardContent>
            <CardActions className="justify-center">
              <Button variant="contained" color="primary" onClick={startQuiz}>
                Start Quiz
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default QuizInstructions;
