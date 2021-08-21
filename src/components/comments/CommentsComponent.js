import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCommentData } from "../../redux/modules/comments/actions";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  block: {
    display: "block",
  },
  email: {
    display: "block",
    cursor: "pointer",
  },
}));

const CommentsComponent = () => {
  const classes = useStyles();

  const comments = useSelector((state) => state.commentsReducer.data);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments/?_limit=10")
      .then(({ data }) => {
        console.log(data);
        dispatch(setCommentData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  return (
    <List className={classes.root}>
      {comments.map((comment) => {
        return (
          <>
            <ListItem alignItems="flex-start" key={comment.id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={comment.name}
                secondary={
                  <>
                    <Typography
                      component="p"
                      variant="body2"
                      className={classes.block}
                      color="textPrimary"
                    >
                      {comment.body}
                    </Typography>
                    <Typography
                      component="div"
                      variant="body2"
                      className={classes.email}
                      color="primary"
                    >
                      {comment.email}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
};

export default CommentsComponent;
