import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

//useSelector is a function that takes the current state as an argument and returns whatever data you want from it and it allows you to store the return values inside a variable within the scope of you functional components instead of passing down as props.
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";

const App = () => {
  // //define useSelectors
  const user = localStorage.getItem("profile");

  return (
    <BrowserRouter>
      {/* <Container maxWidth="xxl"> */}
      <Navbar />
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/posts" />} />
        <Route path="/posts" exact component={Home} />
        <Route path="/posts/search" exact component={Home} />
        <Route path="/posts/:id" component={PostDetails} />
        <Route
          path="/auth"
          exact
          component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
        />
      </Switch>
      {/* </Container> */}
    </BrowserRouter>
  );
};

export default App;
