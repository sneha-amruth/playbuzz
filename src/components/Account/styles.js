import { makeStyles } from '@material-ui/core/styles';
import LoginImg from "../../assets/login.png";
import SignupImg from "../../assets/signup.png";

export default makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
    image: {
       backgroundImage: `url(${LoginImg})`,
       backgroundRepeat: 'no-repeat',
       backgroundSize: 'auto',
       backgroundPosition: 'center',
    }, 
    signUpImage: {
        backgroundImage: `url(${SignupImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
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
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4, 0, 6),
      },
}));