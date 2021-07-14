import { useQuiz } from "../../context/quiz-context";
import React, { useEffect, useState } from "react";
import { Header } from "../Home/Header";
import { restAPICalls } from "../../utils/CallRestAPI";
import { useAuth } from "../../context/auth-context";
import { useLoader } from "../../context/loader-context";
import { CircularProgress, Typography, Grid, Card, CardContent, Container } from "@material-ui/core";
import useStyles from "./styles";

export default function Account(){
    const classes = useStyles();
    const [userName, setUserName] = useState("");
    const { quizState, quizDispatch } = useQuiz();
    const { request } = restAPICalls();
    const { isLoading, setLoading } = useLoader();
    const { isUserLoggedIn } = useAuth();

    useEffect(() => {
        setUserName(JSON.parse(localStorage?.getItem("user")).name);
        if(isUserLoggedIn){
            (async () => {
             try {
                 setLoading(true); 
                 const {data, success} = await request({
                     method:  "GET",
                     endpoint: "/api/scoreboard",
                 });
                 if(success) {
                     quizDispatch({
                         type: 'SET_USER_SCOREBOARD',
                         payload: data
                     })
                     setLoading(false);
                 }
             } catch(err) {
                 console.error(err);
                 setLoading(false);
             }
            })();
         }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserLoggedIn])
    
    return (
        <>
        <Header />
        <Typography style={{marginTop: "2rem"}}component="h1" variant="h5" align="center" color="textSecondary" gutterBottom> Hello, {userName} </Typography>
        <div>
            {isLoading && <CircularProgress style={{marginTop: "20rem"}}/>}
            {!isLoading && 
            <div className={classes.heroContent}>
           <Container maxWidth="sm">
           <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom> 
            Your Scorebaord </Typography>
            {quizState.scoreDetails.length === 0 ? 
            <h1>You've not taken any quiz yet!</h1> :
            <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
                {(quizState.scoreDetails.map((item, index) => 
                    (<div key={index}>
                    <Card>
                        <CardContent>
                        <Grid container>
                        <Grid item xs={6}>
                            <Typography component="h1" variant="h5" align="left" color="primary" gutterBottom>
                                <strong> {item.category}</strong> 
                            </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component="h1" variant="h5" align="right" color="textPrimary" gutterBottom>
                                    score<strong>  {item.score} </strong> 
                                </Typography>
                                </Grid>
                            <Grid item xs={6}>
                                <Typography component="h1" variant="h6" align="left"  color="textSecondary" gutterBottom>
                                    <strong>attempts: {item.attempts}</strong> 
                                </Typography>
                                </Grid>
                                
                            </Grid>
                        </CardContent>
                    </Card> 
                    </div>))
                )}
                  </Grid>
                </Grid>
        }
        </Container>
          </div>}
        </div>
        </>
    )
}