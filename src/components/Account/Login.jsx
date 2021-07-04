import { useAuth } from "../../context/auth-context";
import { useState } from "react";
import { useLoader } from "../../context/loader-context";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Theme, Grid, Paper, Avatar, Typography, TextField, Button, FormLabel, CircularProgress } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LoginImg from "../../assets/login.png";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
      },
    image: {
       backgroundImage: `url(${LoginImg})`,
       backgroundRepeat: 'no-repeat',
       backgroundSize: 'cover',
    backgroundPosition: 'center',
    }, 
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', 
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));

export default function Login() {
    const classes = useStyles();
    const {isUserLoggedIn, loginUserWithCredentials, loginError,setLoginError} = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const {isLoading} = useLoader();
    const {state} = useLocation();
    const navigate = useNavigate();

    if(isUserLoggedIn){
        navigate(state?.from? state.from : "/");
    }
     function loginHandler() {  
        loginUserWithCredentials(credentials.email, credentials.password);
    }
    function handleChange(event){
        setLoginError();
        const {name, value} = event.target;
            setCredentials((prevVal) => {
                if(name === "email")
                    return  { 
                    email: value, 
                    password: prevVal.password
                    }
                else if(name === "password")
                    return {
                        email: prevVal.email,
                        password: value
                    }
            });
        }
       
    
    return (
        <> {isLoading && <CircularProgress style={{marginTop: "20rem"}}/>}
           {!isLoading && 
            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                    <Avatar className={classes.avatar}> <LockOpenOutlinedIcon /> </Avatar>
                    <Typography component="h1" variant="h5">Login</Typography>
                    <form className={classes.form} noValidate>
                    <FormLabel error>{loginError}</FormLabel>
                    <TextField onChange={handleChange} variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                    <TextField onChange={handleChange} variant="outlined" margin="normal" required fullWidth id="password" label="Password" name="password" autoComplete="current-password" autoFocus />
                    <Button type="submit" onClick={loginHandler} fullWidth variant="contained"  color="primary" className={classes.submit}>{isUserLoggedIn ? "logout" : "LOG IN"}</Button>
                    <Grid container justify="flex-end">
                        <Grid item >
                        <Link to="/register" variant="body2"> {"Don't have an account? Sign Up"} </Link>
                        </Grid>
                    </Grid> 
                    </form>
                    </div>
                </Grid>
            </Grid>
           }
        </>
    )
}