/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList} from 'react-native';
import axios from 'axios'

const API_KEY = 'AIzaSyBWm5aQTSWyffTokyKlsX03j7d9hIgH7Q0'
type Props = {};

export default class App extends Component {
  state = {
    groceryItems: []
  }
  postItem =  async () => {
    //fetch api, post request
    try {
       await fetch('https://grocerlert.firebaseio.com//places.json', {
        method: 'POST',
        body: JSON.stringify({
          item: 'milk',
          daysExpire: this.addDays(new Date(),5)
        })
      })
    }
    catch (error) {console.log(error)}
  }

  addDays = function(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }

  getItem =  async () => {
    //fetch api, get request
    const itemsArr = []
    try {
       let response = await fetch('https://grocerlert.firebaseio.com//places.json')
       let parsedRes = await response.json()
       for (const key in parsedRes) {
         itemsArr.push({
           item: parsedRes[key].item,
           daysExpire: parsedRes[key].daysExpire,
           key:key
         })
       }
       this.setState({ groceryItems:itemsArr });
       console.log(this.state)
    }
    catch (error) {console.log(error)}
  }

  getOCR = async () => {
    let body = {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": "https://s3-media4.fl.yelpcdn.com/bphoto/LrkXX1pBqanN7StrzS-FiA/o.jpg" //image URL
            }
          },
          "features": [
            {
              "type": "TEXT_DETECTION",
              "maxResults": 1
            }
          ]
        }
      ]
    }
    try {
      let response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
       body)
      console.log('GOOGLE', response)
   }
   catch (error) {console.log(error)}
  }

  render() {

    return (
      <View style={styles.container}>

      <FlatList
      data={this.state.groceryItems}
      renderItem={({item}) =>
          <Text>Item: {item.item} Expires in {item.daysExpire} days</Text>
      }
      />

        <Button title="Post Milk" onPress={this.postItem}  />
        <Button title="Get Milk" onPress={this.getItem} />
        <Button title="Get OCR" onPress={this.getOCR} />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
