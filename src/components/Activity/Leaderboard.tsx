import React, { useEffect } from "react";
import { useQuiz } from "../../context/quiz-context";
import { useLoader } from "../../context/loader-context";
import { Header } from "../Home/Header";
import { CircularProgress, Typography, Grid, Card, CardContent, Container } from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { restAPICalls } from "../../utils/CallRestAPI";

const useStyles = makeStyles((theme: Theme) => ({
    heroContent: {
       backgroundColor: theme.palette.background.paper,
       padding: theme.spacing(8, 0, 6),
     },
   }));

export const Leaderboard: React.FC  = () => {
    const classes = useStyles();
    const { request } = restAPICalls();
    const { quizState,quizDispatch } = useQuiz();
    const { isLoading,setLoading } = useLoader();

    useEffect(() => {
        (async () => {
            try {
               setLoading(true);
                const {data, success} = await request({
                    method:  "GET",
                    endpoint: `/api/leaderboard`,
                });
                if(success) {
                   quizDispatch({
                       type: 'SET_LEADERBOARD',
                       payload: data
                   });
                   setLoading(false);
                }
            } catch(err) {
                console.error(err);
                setLoading(false);
            }
           })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        <Header />
        <div>
           {isLoading && <CircularProgress style={{marginTop: "20rem"}}/>}
           {!isLoading && 
           <div className={classes.heroContent}>
           <Container maxWidth="sm">
           <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom> Leaderboard </Typography>
           {quizState.leaderboard.map((item,index) => (
               <div key={item._id}>
               <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                        <Grid container>
                        <Grid item xs={6}>
                            <Typography component="h1" variant="h5" align="left" color="primary" gutterBottom>
                                <strong>  {item.firstName} </strong> 
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography component="h1" variant="h6" align="right" color="primary" gutterBottom>
                                <strong> {index+1} 🎉</strong> 
                            </Typography>
                          </Grid>
                            <Grid item xs={6}>
                                <Typography component="h1" variant="h6" align="left"  color="textSecondary" gutterBottom>
                                  <strong>{item.category}</strong> quiz 
                                </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                <Typography component="h1" variant="h5" align="right" color="textPrimary" gutterBottom>
                                    score<strong>  {item.score} </strong> 
                                </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card> 
                </Grid>
                </Grid>
            </div>
          ))}
          </Container>
          </div>}
        </div>
        </>
      
    )
}