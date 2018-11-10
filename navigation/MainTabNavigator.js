import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import AddView from '../components/AddView.js'
import ListView from '../components/ListView.js'



class HomeScreen extends React.Component {
  render() {
    console.log("navigation",this.props.navigation)
    return (
      // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <ListView />
      </View>
    );
  }
}

class AddItem extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AddView />
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: HomeScreen,
  'GotMilk?': AddItem,
});
