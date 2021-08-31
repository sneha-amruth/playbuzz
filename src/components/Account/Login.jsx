import { useAuth } from "../../context/auth-context";
import { useState } from "react";
import { useLoader } from "../../context/loader-context";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, Paper, Avatar, Typography, TextField, Button, FormLabel, CircularProgress } from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import useStyles from "./styles";

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
     function loginHandler(event) {  
        event.preventDefault();
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
    function handleGuestCredentials() {
        loginUserWithCredentials("testuser@gmail.com", "testuser@12");
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
                    <TextField onChange={handleChange} variant="outlined" margin="normal" type="password" required fullWidth id="password" label="Password" name="password" autoComplete="current-password" autoFocus />
                    <Button type="submit" onClick={loginHandler} fullWidth variant="contained"  color="primary" className={classes.submit}>{isUserLoggedIn ? "logout" : "LOG IN"}</Button>
                    <Button type="button" onClick={handleGuestCredentials} className="btn btn-primary btn-large">Use Guest Credentials</Button>
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