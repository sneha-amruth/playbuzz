import { useQuiz } from "../../context/quiz-context";
import React, { useEffect } from "react";
import { restAPICalls } from "../../utils/CallRestAPI";
import { useLoader } from "../../context/loader-context";
import { CircularProgress, Typography, Grid, Card, CardContent, Container } from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    heroContent: {
       backgroundColor: theme.palette.background.paper,
       padding: theme.spacing(4, 0, 6),
     },
   }));

export const UserActivity: React.FC = () => {
    const classes = useStyles();
    const { quizState, quizDispatch } = useQuiz();
    const { request } = restAPICalls();
    const { isLoading, setLoading } = useLoader();
   
     useEffect(() => {
       (async () => {
        try {
            setLoading(true); 
            const {data, success} = await request({
                method:  "GET",
                endpoint: `/api/scoreboard`,
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
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div >
            {isLoading && <CircularProgress style={{marginTop: "20rem"}}/>}
            {!isLoading && 
            <div className={classes.heroContent}>
           <Container maxWidth="sm">
           <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom> 
            Your Scorebaord </Typography>
            {quizState?.scoreDetails.length === 0 ? 
            <h1>You've not taken any quiz yet!</h1> :
            <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
                {(quizState?.scoreDetails?.map((item, index) => 
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
    )
}