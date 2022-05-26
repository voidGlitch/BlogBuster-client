import React from "react";
import ReactDOM from "react-dom";
//Allow us to access the store from anywhere inside of the app
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import "./index.css";

//Firstly create a store
/*Create store takes two argument reducers and a function" compose(applyMiddleware(thunk))" */
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  //Wrap our application within the ProviderS
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
