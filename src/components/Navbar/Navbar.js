import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Blog from "../../Images/Blogs.png";
import useStyles from "./styles.js";
import decode from "jwt-decode";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate.push("/");
  };
  const Back = () => {
    navigate.push("/");
  };

  useEffect(() => {
    const token = user?.token;

    //JWT
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) Logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <img
          className={classes.image}
          src={Blog}
          alt="icon"
          height="65px"
          onClick={Back}
        />
        {/* <img className={classes.image} src={Blog} alt="memories" height="60" /> */}
      </div>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>

            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={Logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
