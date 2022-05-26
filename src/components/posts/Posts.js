import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
//useSelector hook is used to get the state from the redux store
import { useSelector } from "react-redux";
import Post from "./post/Post";
import useStyles from "./Styles";

const Posts = ({ setCurrentId }) => {
  //The State which we are using currently is the posts array
  const { posts, isLoading } = useSelector((state) => state.posts); // Now before we are getting the array and now we are getting the object -> [] -> {posts:[]}
  console.log(posts);
  const classes = useStyles();

  if (!posts?.length && !isLoading) return "No Posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {/* This is map method which will map inside every item inside the post array */}
      {posts.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
