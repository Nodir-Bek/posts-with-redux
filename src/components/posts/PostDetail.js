import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CommentsComponent from "../comments/CommentsComponent";
import EditIcon from "@material-ui/icons/Edit";
import { activePost } from '../../redux/modules/posts/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 768,
    margin: "20px auto",
  },
  header: {
    textAlign: "center",
    fontSize: 30,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PostDetail = () => {
  const classes = useStyles();
  const randomImage = "https://picsum.photos/200/300";
  const { id } = useParams();
  const posts = useSelector((state) => state.postsReducer.data);
  let history = useHistory();
  const dispatch = useDispatch();
  const [card, setCard] = useState({});
  const date = new Date();
  useEffect(() => {
    const data = posts.filter((c) => {
      return c.id === Number(id);
    });
    setCard(...data);
  }, [id, posts]);
  const [expanded, setExpanded] = React.useState(false);
  const handleClick = () => {
    dispatch(activePost(card.id))
    history.push(`/update-post/${card.id}`);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              N_B
            </Avatar>
          }
          action={
            <IconButton
              color="primary"
              aria-label="edit post"
              onClick={() =>
                handleClick()
              }
            >
              <EditIcon />
            </IconButton>
          }
          title={card.title && card.title}
          subheader={date.toLocaleDateString()}
        />
        <CardMedia
          className={classes.media}
          image={randomImage}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {card.body && card.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="h6" color="textSecondary">
            Comments :
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <CommentsComponent />
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default PostDetail;
