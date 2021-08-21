import React from "react";
// import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PostsList from "./components/posts/PostsList";
import PostDetail from "./components/posts/PostDetail";
import AddPost from "./components/posts/AddPost";
import CommentsComponent from "./components/comments/CommentsComponent";
import AddComments from "./components/comments/AddComments";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";
import UpdatePost from "./components/posts/UpdatePost";
import { ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <>
      <Router>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Link to="/" underline="none" style={{ textDecoration: "none" }}>
              <Typography variant="h6" className={classes.title}>
                Posts
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <Container>
          <Switch>
            <Route exact path="/" component={PostsList} />
            <Route path="/post/:id" component={PostDetail} />
            <Route path="/add-post" component={AddPost} />
            <Route path="/update-post" component={UpdatePost} />
            <Route path="/comments" component={CommentsComponent} />
            <Route path="/add-comments" component={AddComments} />
          </Switch>
        </Container>
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>{" "}
      </Router>
      <ToastContainer />
    </>
  );
};
export default App;

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};
