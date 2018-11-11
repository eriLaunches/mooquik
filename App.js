import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList} from 'react-native';
import AppNavigator from './navigation/AppNavigator.js';
import HeaderBar from './components/HeaderBar.js'
import {connect} from 'react-redux'
import {fetchGroceries} from './store/reducer.js'



type Props = {};

class App extends Component {
  state = {
  }
  componentDidMount(){
    console.log('ADDVIEW',this.props)

    this.props.onFetchGroceries()
    console.log('ADDVIEW',this.props)
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

const mapStateToProps = (state) => {
  return {
    groceries: state.groceries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchGroceries: function() {
      const thunk = fetchGroceries()
      dispatch(thunk)
    }
  }
}

const ConnectApp = (connect(mapStateToProps, mapDispatchToProps)(App))

export default ConnectApp
