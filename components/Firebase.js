import * as firebase from 'firebase';
import React, {Component} from 'react';

const settings = {timestampsInSnapshots: true};
console.log('settings',settings)



import { Button, StyleSheet } from 'react-native';

var config = {
  apiKey: "AIzaSyDn1DOKOSjcs3AR6OgaueAsqWMj2OGEMiM",
  authDomain: "grocerlert.firebaseapp.com",
  databaseURL: "https://grocerlert.firebaseio.com",
  projectId: "grocerlert",
  storageBucket: "grocerlert.appspot.com",
  messagingSenderId: "753561956690"
};

class Fire extends Component {
  constructor(props) {
    super(props);
    this.state = {  }

    this.uploadToCloud = this.uploadToCloud.bind(this)
  }

  uploadToCloud() {
    firebase.initializeApp(config);
    var storage = firebase.storage().ref().child('images10'); //images3 represents name

    storage.putString(this.props.receipt, 'base64').then(snapshot => console.log('uploaded the base to Firebase cloud!', snapshot))
    console.log('storage', storage)
    console.log('firebase', firebase)
  }
  render() {
    console.log('FIREBASE PROPS', this.props)
    console.log('hEREEREE')
    return (
      <Button title="Upload to Firebase Cloud" onPress={this.uploadToCloud}/>
     );
  }
}

export default Fire


// var storage = firebase.storage().ref().child('images'); //storing this

// storage.putString(Base_64, 'base64').then(snapshot => console.log('uploaded the base to Firebase cloud!', snapshot))


// console.log('storage', storage)
// console.log('firebase', firebase)
// export default firebase;
