import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import IconButton from '@material-ui/core/IconButton';
import React from "react";

const useStyles = makeStyles(() => ({
    typographyStyle: {
        flex: 1,
        textDecoration: "none",
        color: "#ffff",
    },
    link: {
        textDecoration: "none",
    },
    iconStyle: {
        size: "medium",
        color: "#ffff"
    },
  }));

export const Header: React.FC = () => {
    const classes = useStyles();
   const { isUserLoggedIn, logoutUser } = useAuth();
    return (
        <Grid container >
            <AppBar position="static">
                <Toolbar>
                 <Typography variant="h4" component={Link} to="/" className={classes.typographyStyle}>🎴playbuzz🎴</Typography>
                    {isUserLoggedIn &&  
                        <Grid item>
                            <IconButton onClick={() => {logoutUser()}} className={classes.iconStyle} aria-label="logout"> <ExitToAppIcon /> </IconButton>
                            <IconButton component={Link} to="/account" className={classes.iconStyle} aria-label="account"> <AccountCircleIcon /> </IconButton>
                            <IconButton component={Link} to="/leaderboard" className={classes.iconStyle} aria-label="leaderboard"> <AssessmentIcon/> </IconButton>
                        </Grid>}
                </Toolbar>
            </AppBar>
            </Grid>
       
    )
}