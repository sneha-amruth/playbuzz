import { useQuiz } from "../../context/quiz-context";
import { useNavigate } from "react-router-dom";
import { Category } from "../../context/quizContext.type";
import React from "react";
import { Header } from "./Header";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Button, Typography, Grid, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 500,
        margin: theme.spacing(8, 4, 0, 4),
      },
      media: {
        height: 250,
      },
    }));

export const Explore: React.FC = () => {
    const classes = useStyles();
    const { quizState, quizDispatch } = useQuiz();
    const navigate = useNavigate();
    
    const handleClick = (id: string, category: Category) => {
        quizDispatch({
            type: "INITIATE_QUIZ",
            payload: category
        })
        navigate(`/quiz/${id}`);
    }
    return (
        <>
          <Header />
          <Grid container direction="row">
          {quizState?.quizes?.map(quiz => (
          <Grid item sm={12} md={12} lg={4} key={quiz._id}>
           <Card className={classes.root}>
              <CardActionArea>
                  <CardMedia className={classes.media} image={quiz.image} title="Quiz Category"/>
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  {quiz.category}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {quiz.description}
                </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions>
              <Button onClick={() => handleClick(quiz._id, quiz.category)} size="medium" color="primary"> Take Quiz </Button>
              </CardActions>
           </Card>
           </Grid>
            ))}
         </Grid>
        </>
    )
}