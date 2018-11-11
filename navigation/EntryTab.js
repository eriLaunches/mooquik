
import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator, NavigationEvents } from 'react-navigation';


export default class AddItem extends React.Component {
  _onNavigationStateChange = (prevState, newState) => {
    this.setState({...this.state, route_index: newState.index});
  }

  render() {
    return (
      <View>
      <ListView onNavigationStateChange={this._onNavigationStateChange}/>
    </View>
    );
  }
}
