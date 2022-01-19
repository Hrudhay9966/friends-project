import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Hidden } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import Login from "./Components/login/Login";
import Header from "./Components/header/Header";
import Form from "./Components/form/Form";
import Posts from "./Components/posts/Posts";
import Sidebar from "./Components/sidebar/Sidebar";
import Widgets from "./Components/widgets/Widgets";
import { LoginAction, LogoutAction } from "./store/actions/auth";
import { auth } from "./firebase";
import Styles from "./Style";
import { FriendsInBgColor, darkPrimary } from "./assets/Colors";
import swal from "@sweetalert/with-react";


const App = () => {
  const classes = Styles();

  const dispatch = useDispatch();

  const { displayName } = useSelector((state) => state.user);

  const mode = useSelector((state) => state.util);

  const muiTheme = createMuiTheme({
    palette: {
      type: mode ? "dark" : "light",
    },
  });

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(LoginAction(authUser));
      } else {
        dispatch(LogoutAction());
      }
    });
  }, []);

  return (
    <ThemeProvider theme={muiTheme}>
      {!displayName ? (
        <Login />
      ) : (
        <Grid
          container
          className={classes.app}
          style={{ backgroundColor: mode ? darkPrimary : FriendsInBgColor }}
        >
          <Grid
            item
            container
            className={classes.app__header}
            style={{
              boxShadow: mode && "0px 5px 10px -10px rgba(0,0,0,0.75)",
            }}
          >
            
            <Header />
          </Grid>
          <Grid item container className={classes.app__body}>
            <Hidden smDown>
              <Grid item className={classes.body__sidebar} md={2}>
                
                <Sidebar />
              </Grid>
            </Hidden>
            <Grid item className={classes.body__feed} xs={12} sm={8} md={5}>
              
              <Grid item className={classes.feed__form}>
                <Form />
              </Grid>
              <Grid item className={classes.feed__posts}>
                <Posts />
              </Grid>
            </Grid>
            <Hidden smDown>
              <Grid item className={classes.body__widgets} md={3}>
                
                <Widgets />
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
};

export default App;