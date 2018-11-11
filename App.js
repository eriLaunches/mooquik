import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList} from 'react-native';
import AppNavigator from './navigation/AppNavigator.js';
import HeaderBar from './components/HeaderBar.js'

type Props = {};

export default class App extends Component {
  state = {
  }


  render() {
    return (
      <View style={styles.container}>
        <HeaderBar />
        <AppNavigator />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
