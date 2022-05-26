import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChipInput from "material-ui-chip-input";
//Helps us to dispatch our action
import { useDispatch } from "react-redux";
import Form from "../form/Form";
import Posts from "../posts/Posts";
import { getPosts, getPostsbySearch } from "../../actions/posts";
import Paginate from "../Pagination";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  //Define dispatch
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  /* As we add the pagination feature we no longer need the useEffect to getallposts */
  // //Now As we want our dispact to mount manually we use useEffect
  // useEffect(() => {
  //   //Dispatch Takes a Function to call
  //   dispatch(getPosts(page));
  //   console.log("refresh");
  //   //when currentId is changing after we change the post we get fresh posts
  // }, [dispatch, currentId]);

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      //Search post
    }
  };
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagtoDelete) =>
    setTags(tags.filter((tag) => tag !== tagtoDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      //Dispatch => fetch search post
      //Joins the array into a series of commas seperated word like [usa,canada] -> 'usa,canda'
      dispatch(getPostsbySearch({ search, tags: tags.join(",") }));
      //Client side Routing for the search and tags
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              color="inherit"
              position="static"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeypress}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                className={classes.searchButton}
                color="primary"
                variant="contained"
                onClick={searchPost}
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
