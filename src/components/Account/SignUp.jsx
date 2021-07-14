import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { Grid, Paper, Avatar, Typography, TextField, Button, FormLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from "react-router-dom";
import useStyles from "./styles";

export default function SignUp(){
    const classes = useStyles();
    const { registerError, setRegisterError, registerUser } = useAuth();

    const [accountDetails, setAccountDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const handleCreate = (event) => {
        event.preventDefault();
        const regexExp = /^\S+@\S+$/;
        if(accountDetails.firstName === "" || accountDetails.lastName === "" || accountDetails.email === "" || accountDetails.password === "" ){
            setRegisterError("Please enter all the details");
            return;
        }

        if(!regexExp.test(accountDetails.email)){
            setRegisterError("Incorrect email");
            return;
        }
        registerUser(accountDetails.firstName, accountDetails.lastName, accountDetails.email, accountDetails.password);
    }
    const handleChange = (event) => {
        setRegisterError();
        const { name, value } = event.target;
        setAccountDetails((prevVal) => {
            if(name === "firstName")
                return {
                    firstName: value,
                    lastName: prevVal.lastName,
                    email: prevVal.email,
                    password: prevVal.password
                }
            else if(name === "lastName")
                return {
                    firstName: prevVal.firstName,
                    lastName: value,
                    email: prevVal.email,
                    password: prevVal.password
                }
            else if(name === "email"){
                return {
                    firstName: prevVal.firstName,
                    lastName: prevVal.lastName,
                    email: value,
                    password: prevVal.password
                }
            }
            else if(name === "password")
                return {
                    firstName: prevVal.firstName,
                    lastName: prevVal.lastName,
                    email: prevVal.email,
                    password: value
                }
        });
    }
    return(
    <>
     <Grid container component="main" className={classes.root}>
     <Grid item xs={false} sm={4} md={7} className={classes.signUpImage} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
        <Typography component="h1" variant="h5">Sign Up</Typography>
        <form className={classes.form} noValidate>
        <FormLabel error>{registerError}</FormLabel>
        <TextField onChange={handleChange} variant="outlined" margin="normal" required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="firstName" />
        <TextField onChange={handleChange} variant="outlined" margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lastName" />
        <TextField onChange={handleChange} variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
        <TextField onChange={handleChange} type="password" variant="outlined" margin="normal" required fullWidth id="password" label="Password" name="password" autoComplete="current-password" />
        <Button type="submit" onClick={handleCreate} fullWidth variant="contained"  color="primary" className={classes.submit}>Create Account</Button>
        <Grid container justify="flex-end">
            <Grid item >
            <Link to="/login" variant="body2"> {"Already have an account? Login"} </Link>
            </Grid>
        </Grid> 
        </form>
        </div>
        </Grid>
     </Grid>
    </>
    )
}
