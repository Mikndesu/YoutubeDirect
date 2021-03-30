import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import firebase from "./auth/firebase";
import "./App.css";
import Youtube from "./component/youtube/youtube";

class App extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

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
    this.setState({user:null})
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <h2>You are currently logged in.</h2>
            <Youtube
              apikey={process.env.REACT_APP_FIREBASE_APIKEY}
              userID={this.state.user.uid}
            />
            <button onClick={this.logout}>Google Logout</button>
          </div>
        ) : (
          <div>
            <h2>You aren't currently logged in now.</h2>
            <button onClick={this.login}>Google Login</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
