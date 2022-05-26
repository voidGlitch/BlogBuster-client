import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
// React Component for Converting Files to base64
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [postData, setpostData] = useState({
    Title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const history = useHistory();
  //For updating post we first need to particular post from the array of posts from reducers
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (post) setpostData(post);
  }, [post]);
  const handleSubmit = (e) => {
    e.preventDefault();
    //If we have the access to currentid we are going to update the Post by giving it the id and updated Data else creating it
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to create your own memories and Like other's post
        </Typography>
      </Paper>
    );
  }
  const clear = () => {
    setCurrentId(null);
    setpostData({
      Title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Blog
        </Typography>

        <TextField
          name="Title"
          variant="outlined"
          label="Title"
          fullWidth
          onChange={(e) => setpostData({ ...postData, Title: e.target.value })}
          value={postData.Title || ""}
        />
        <TextField
          name="message"
          variant="outlined"
          rows={6}
          multiline
          label="message"
          fullWidth
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
          value={postData.message}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          //Split is used to split the text into two seperate words in this case for tags which will added in array as seperate
          onChange={(e) =>
            setpostData({ ...postData, tags: e.target.value.split(",") })
          }
          value={postData.tags}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setpostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          onClick={clear}
          size="large"
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;

{
  /* As we defined creator by logged in user we dont need it 
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          onChange={(e) =>
            setpostData({ ...postData, creator: e.target.value })
          }
          value={postData.creator}
        /> */
}
