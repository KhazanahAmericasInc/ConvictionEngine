import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase";
import { BrowserRouter } from 'react-router-dom';

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyBpz2HstqVFd4W1PQtniZCalJnCsgAAKLQ",
  authDomain: "convictionengine.firebaseapp.com",
  databaseURL: "https://convictionengine.firebaseio.com",
  storageBucket: "convictionengine.appspot.com"
};
firebase.initializeApp(config);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));
registerServiceWorker();
