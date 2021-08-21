import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardMedia, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: "rgba(0,0,255,0.1)",
    border: "1px solid rgba(0,0,255,0.4)",
    boxShadow: "3px 4px 31px 7px rgba(0,0,0,0.56)",
    borderRadius: 10,
  },
  media: {
    height: 140,
    backgroundColor: "rgba(0,0,255,0.2)",
    borderRadius: 10,
    padding: 5,
    color: "white",
    textAlign: "center",
    textTransform: "Uppercase",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function PostsCard({
  title,
  text,
  handleClick,
  id,
  handleDelete,
}) {
  const classes = useStyles();

  const randomImage = "https://picsum.photos/200/300";
  return (
    <Grid item xs={12} sm={6} py={2}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={randomImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.media}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => handleClick(id)}>
            View details
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => handleDelete(id)}
          >
            delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
