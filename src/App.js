import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from "./auth/firebase";
import "./App.css";
import Youtube from "./component/youtube/youtube"

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          UID: {this.state.user && this.state.user.uid}
        </p>

        {this.state.user ? (
          <div>
            <h2>You are currently logged in.</h2>
            <Youtube apikey={process.env.REACT_APP_FIREBASE_APIKEY}/>
            <button onClick={this.logout}>Google Logout</button>
          </div>
        ) : (
          <button onClick={this.login}>Google Login</button>
        )}
      </div>
    );
  }
}

export default App;
