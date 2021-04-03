import firebase from "../../auth/firebase";
import "firebase/database";

export default class Database {
  write(user, obj) {
    firebase.database().ref(user).push(obj);
  }

  read(user) {
    firebase
      .database()
      .ref(user)
      .once("value", (res) => {
        console.log(res);
      });
  }
}