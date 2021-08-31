import { Link } from "react-router-dom";
import React from "react";
import { Header } from "./Header";
import { useAuth } from "../../context/auth-context";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import LandingPageImg from "../../assets/landingpage.png";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
    link: {
        textDecoration: "none",
    },
    btnPrimary: {
        margin: "1rem 0.3rem",
        
    },
    image: {
        backgroundImage: `url(${LandingPageImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
       backgroundPosition: 'center',
     }, 
     heroText: {
        [theme.breakpoints.up('md')]: {
            marginTop: "14rem"
          },
       
     }
  }));

export const Home: React.FC = () => {
   const classes = useStyles();
   const { isUserLoggedIn } = useAuth();
  
    return (
        <>
        <Header />
        <Grid container component="main" direction="row" className={classes.root} >
            <Grid item xs={false} sm={false} md={7} className={classes.image} />
            <Grid item className={classes.heroText }>
              <Typography variant="h4" color="textPrimary" gutterBottom>welcome to playbuzz</Typography>
                <Typography variant="h5" color="textSecondary" paragraph>If you're a skincare nerd, take this fun Skincare Quiz </Typography>
                {isUserLoggedIn && 
                   <Button component={Link} to="/explore" variant="contained" size="large" color="primary">Explore</Button>}
                {!isUserLoggedIn && 
                <div>
                    <Button component={Link} to="/login" variant="contained" size="large" color="primary" className={classes.btnPrimary}>Login</Button>
                    <Button component={Link} to="/register" variant="outlined" size="large" color="primary">Sign Up</Button>
                </div> }
        </Grid>
       </Grid> 
    </>
    )
}
