import React, { useState, useEffect } from "react";
import { useQuiz } from "../../context/quiz-context";
import { QuestionsList, Category, Options } from "../../context/quizContext.type";
import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => createStyles({
    btnStyle: {
      padding: theme.spacing(1),
      marginTop: "1rem", 
    },
    }),
);

type Props = {
    questionObj: QuestionsList,
    category: Category,
    currentScore: number,
    setShowBtn: (val: boolean) => void
}

export const CurrentQuestion: React.FC<Props> = (props) => {
    const classes = useStyles();
    const questionObj = props.questionObj;
    const category = props.category;
    const score = props.currentScore;
    const setShowBtn = props.setShowBtn;

    const { incOrDecScore } = useQuiz();
    const [optionBtns, setOptionBtns] = useState<boolean>(true);
    const [rightAnswer, setRightAnswer] = useState<Options | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<Options | null>(null);

    const handleSelectedAns = (selectedAns: Options) => {
        setShowBtn(true);
        setOptionBtns(false);
        setSelectedAnswer(selectedAns);

       if(selectedAns === rightAnswer) {
         incOrDecScore({type: 'INCREMENT_SCORE', category, score});
       } else {
          incOrDecScore({type: 'DECREMENT_SCORE', category, score});
       }
    }
    useEffect(() => {
        setOptionBtns(true);
        setRightAnswer(questionObj?.options.filter(optionObj => optionObj.isRight )[0]);
        setSelectedAnswer(null);
    }, [questionObj])

    return (
        <>
        <Grid item key={questionObj?._id}>
             <Grid item> <Typography variant="h5">{questionObj?.question}</Typography> </Grid>
                    {questionObj?.options.map(optionObj => (
                      <div key={optionObj._id}>
                        <Grid item sm={12}>
                            <Button 
                              className={classes.btnStyle} 
                               variant="outlined" onClick={() => handleSelectedAns(optionObj)} disabled={!optionBtns}> 
                                {optionObj.text}
                                {selectedAnswer && rightAnswer === optionObj && <DoneIcon color="primary"/>} 
                                {selectedAnswer !== rightAnswer && selectedAnswer === optionObj && <CloseIcon color="primary"/>}
                            </Button>
                        </Grid>
                        </div>
                        ))}
               </Grid>
        </>
    )
}