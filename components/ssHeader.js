import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View, Button, FlatList, Image} from 'react-native';
import {Platform, StyleSheet, Text, View, Button, FlatList, ScrollView} from 'react-native';
import { List, ListItem, Icon, Header, HeaderIcon } from 'react-native-elements'

const Header = (props) => {
 return (
  <Image source={require('./img/milk_icon.png')} />
 )
}

export default Header
