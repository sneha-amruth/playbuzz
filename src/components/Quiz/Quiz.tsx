import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/quiz-context";
import { CurrentQuestion } from "../Quiz/CurrentQuestion";
import { QuestionsList } from "../../context/quizContext.type"
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme: Theme) => createStyles({
    categoryStyle: {
      padding: theme.spacing(1),
      marginTop: "2rem", 
      textDecoration: "underline", 
    },
    nextBtnStyle: {
        marginTop: "1rem", 
    }
    }),
);

export const Quiz: React.FC = () => {
    const classes = useStyles();
    const { quizId } = useParams();
    const { quizState, submitScore } = useQuiz();
    const [nextQues, setNextQues] = useState<number>(0);
    const [buttonText, setButtonText] = useState<"Next Question" | "Submit">("Next Question");
    const [showBtn, setShowBtn] = useState<boolean>(false);
    const navigate = useNavigate();

    const currentQuiz = quizState?.quizes?.filter(quiz => quiz._id === quizId)[0];
    const currentScore = quizState?.scoreDetails.filter(item =>  item.category === currentQuiz.category)[0]?.score;
    const noOfQues = currentQuiz?.questionsList.length - 1;
   
    const [questionObj, setQuestionObj] = useState<QuestionsList>(currentQuiz?.questionsList[0]);

    useEffect(() => {
        setQuestionObj(currentQuiz?.questionsList[nextQues]);
        if(nextQues === noOfQues) {
            setButtonText("Submit")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[nextQues, []]);

    const handleNextQues = () => {
        if(nextQues < noOfQues) {
          setNextQues(nextQues+1);
          setShowBtn(false);
        }
        else if(nextQues === noOfQues) {
            const activity = quizState?.scoreDetails.filter(item => item.category === currentQuiz?.category)[0];
            submitScore({category: activity.category, score: activity.score, attempts: activity.attempts});
            navigate(`/quiz/${currentQuiz._id}/scoreboard`);
        }
    }

    return (
        <>    
            { questionObj?.question &&  
              <Grid container direction="column" spacing={2}>
                  <Grid item>
                      <Typography gutterBottom className={classes.categoryStyle} variant="h4" component="h2" color="primary"> {currentQuiz?.category}</Typography> 
                  </Grid>
                  <Grid item container> 
                  <Grid item xs={8}>
                    <Typography variant="h6" color="primary">  <strong style={{fontSize: "1.8rem"}}>{nextQues+1}</strong>/5 </Typography>
                  </Grid>
                  <Grid item alignItems="flex-end">
                      <Typography variant="h6" color="secondary"> SCORE <strong style={{fontSize: "1.8rem"}}>{currentScore}</strong> </Typography> 
                  </Grid>
                  </Grid>
                  <CurrentQuestion questionObj={questionObj} category={currentQuiz?.category} currentScore={currentScore} setShowBtn={setShowBtn}/>
                    <Grid item>{showBtn && <Button className={classes.nextBtnStyle} onClick={() => handleNextQues()} variant="contained" color="primary" endIcon={<NavigateNextIcon/>}> {buttonText}</Button>}</Grid> 
                </Grid>
              
           }
      
        </>
    )
}