import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, ScrollView} from 'react-native';
const milkImg = require('./img/milk_icon.png')
import { List, ListItem, Icon, Header, HeaderIcon } from 'react-native-elements'



const HeaderBar = props => {
return (
  <View style={styles.container}>
  <Header
  backgroundColor = 'D6EADF'
  centerComponent={{ text: 'Mooquik!', style: { color: '#DBA159', fontSize:30, fontFamily:'Chalkduster'} }}
  centerContainerStyle={{fontSize:25}}
/>
</View>
)

}

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold'
  }

});
