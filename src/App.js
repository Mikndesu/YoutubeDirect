import React, { Component } from "react";
import firebase from "./auth/firebase";
import "./App.css";

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
            <h2>現在ログイン中です。</h2>
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
