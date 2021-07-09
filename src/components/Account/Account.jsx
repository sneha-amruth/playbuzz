import { useEffect, useState } from "react";
import { UserActivity } from "../Activity/UserActivity";
import { useAuth } from "../../context/auth-context";
import { Header } from "../Home/Header";
import { Typography } from "@material-ui/core";

export default function Account(){
    const [userName, setUserName] = useState("");
    const { isUserLoggedIn } = useAuth();

    useEffect(() => {
        setUserName(JSON.parse(localStorage?.getItem("user")).name);
    }, [isUserLoggedIn])
    
    return (
        <>
        <Header />
        <Typography style={{marginTop: "2rem"}}component="h1" variant="h5" align="center" color="textSecondary" gutterBottom> Hello, {userName} </Typography>
        <div>
            <UserActivity />
        </div>
        </>
    )
}