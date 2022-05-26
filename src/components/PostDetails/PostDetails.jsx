import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./Styles";
import { getPost, getPostsbySearch } from "../../actions/posts";
import Recommend from "./Recommend";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const openPost = (_id) => history.push(`/posts/${_id}`);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsbySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.Title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>

          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <CommentSection post={post} />
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div
          className={classes.imageSection}
          style={{
            marginLeft: "20px",
          }}
        >
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
            style={{ maxWidth: "800px", width: "100%" }}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also Like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ Title, message, name, likes, selectedFile, _id }) => (
                // <div
                //   key={_id}
                //   style={{ margin: "20px", cursor: "pointer" }}
                //   onClick={() => openPost(_id)}
                // >
                //   <Typography gutterBottom variant="h6">
                //     {Title}
                //   </Typography>
                //   <Typography gutterBottom variant="subtitle2">
                //     {name}
                //   </Typography>
                //   <Typography gutterBottom variant="subtitle2">
                //     {message}
                //   </Typography>
                //   <Typography gutterBottom variant="subtitle1">
                //     Likes: {likes.length}
                //   </Typography>
                //   <img src={selectedFile} width="200px" />
                // </div>
                <div
                  key={_id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => openPost(_id)}
                >
                  <Recommend
                    Title={Title}
                    message={message}
                    name={name}
                    likes={likes}
                    selectedFile={selectedFile}
                    _id={_id}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
