import React, { useRef, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./Styles";
import { commentPost } from "../../actions/posts";
const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [Comments, setComments] = useState(post?.comments);
  const [Comment, setComment] = useState();
  const dispatch = useDispatch();
  const commentRef = useRef();

  //Populate user from local Storage
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleClick = async () => {
    //User name with the comment he provide
    const finalComment = `${user.result.name}:${Comment}`;
    console.log(finalComment);
    console.log(post._id);
    //Dispatching the action with comment and the post id
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");

    commentRef.current.scrollIntoView({ behaviour: "smooth" });
  };
  return (
    <div>
      <div className={classes.commentOuterContainer}>
        <div className={classes.commentInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>

          {Comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(":")[0]}</strong>:{c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        {/*New JS sign to not throw an error if the user is undefined */}
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              row={4}
              variant="outlined"
              label="Comment"
              multiline
              value={Comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!Comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
