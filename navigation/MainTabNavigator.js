import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, NavigationEvents } from 'react-navigation';
import AddView from '../components/AddView.js'
import ListView from '../components/ListView.js'
import Ionicons from 'react-native-vector-icons/Ionicons';



class HomeScreen extends React.Component {
  render() {
    console.log("navigation",this.props.navigation)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <AddView navigation={this.props.navigation}/>
      </View>

    );
  }
}

class List extends React.Component {

  render() {
    return (
      <View>
      <ListView />
    </View>
    );
  }
}

export default createBottomTabNavigator(
{
  Home: HomeScreen,
  List: List,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'ios-home';
      } else if (routeName === 'List') {
        iconName = 'ios-list';
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#39A9DB',
    inactiveTintColor: '#DBA159',
  },

}


);
