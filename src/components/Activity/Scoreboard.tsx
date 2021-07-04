import { useQuiz } from "../../context/quiz-context";
import { useParams } from "react-router-dom";
import { useLoader } from "../../context/loader-context";
import { Category } from "../../context/quizContext.type";
import React from "react";
import { Header } from "../Home/Header";
import { Link } from "react-router-dom";
import { Typography, Button, CircularProgress, Container, Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
     heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
    }));

export const Scoreboard: React.FC  = () => {
    const classes = useStyles();
    const { quizState, quizDispatch } = useQuiz();
    const { quizId } = useParams();
    const { isLoading } = useLoader();
   
    const category = quizState?.quizes?.filter(item => item._id === quizId)[0]?.category;
    const scoreboard = quizState?.scoreDetails.filter(item => item.category === category)[0];
    const retakeQuizRoute = `/quiz/${quizId}`;
    const rightAns = scoreboard?.rightAns;
    const wrongAns = scoreboard?.wrongAns

    const handleClick = (id: string, category: Category) => {
        quizDispatch({
            type: "INITIATE_QUIZ",
            payload: category
        })
       
    }
   
    return (
        <>
        <Header />
        {isLoading && <CircularProgress style={{marginTop: "20rem"}}/>}
        {!isLoading && 
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
              🎉wofoo, you completed the <strong> {scoreboard?.category} </strong> quiz 🎉
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography component="h1" variant="h5" align="center" color="primary" gutterBottom>
                                SCORE<strong> {scoreboard?.score} </strong> 
                            </Typography>
                            <Grid container>
                            <Grid item xs={6}>
                                <Typography component="h1" variant="h6" align="left"  color="textPrimary" gutterBottom>
                                    Attempted<strong> {scoreboard?.attempts} </strong> 
                                </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                <Typography component="h1" variant="h6" align="right" color="textPrimary" gutterBottom>
                                    Total Questions<strong> 5 </strong> 
                                </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                <Typography component="h1" variant="h6" align="left" color="textPrimary" gutterBottom>
                                    Right Answers<strong> {rightAns} </strong> 
                                </Typography></Grid>
                                <Grid item xs={6}>
                                <Typography component="h1" variant="h6" align="right" color="textPrimary" gutterBottom>
                                    Wrong Answers<strong> {wrongAns} </strong> 
                                </Typography>
                            </Grid>
                            </Grid>
                        </CardContent>
                    </Card> 
                </Grid>
                <Grid item>
                  <Button onClick={() => handleClick(quizId, category)} component={Link} to={retakeQuizRoute} variant="contained" color="primary">
                    Retake quiz
                  </Button>
                </Grid>
                <Grid item>
                  <Button component={Link} to="/leaderboard" variant="outlined" color="primary">
                    Go to Leaderboard
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        }
        </>
    )
}