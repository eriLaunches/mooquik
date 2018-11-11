import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, NavigationEvents } from 'react-navigation';
import AddView from '../components/AddView.js'
import ListView from '../components/ListView.js'



class HomeScreen extends React.Component {

  render() {
    console.log("navigation",this.props.navigation)
    return (
      // <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         {/* <NavigationEvents
          onDidBlur={payload => {
            this.props.navigation.navigate('Entries')
            console.log("will focus", payload);
          }}
        /> */}
        <AddView navigation={this.props.navigation}/>
      </View>

    );
  }
}

class AddItem extends React.Component {



  render() {
    return (
      <View>
      <ListView />
    </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: HomeScreen,
  Entries: AddItem,
});
