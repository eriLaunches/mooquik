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
// import Firebase from './components/Firebase.js'
import ImageSelection from './components/ImageSelection.js'
import GetOCRButton from './components/GetOCRButton.js'
import AppNavigator from './navigation/AppNavigator.js';


const API_KEY = 'AIzaSyBWm5aQTSWyffTokyKlsX03j7d9hIgH7Q0'
let OCR_RESPONSE = {
  data: {
    responses: [
      {
        fullTextAnnotation: {
          text: '5950 Balboa Ave↵San Diego, CA 09211↵Phone # 858-694-0237↵Store Director - Ben Hernandez↵Cashier:Self Checkout↵07/22/15↵16:22:32↵DAIRY↵1 LOW FAT MILK↵72698461014↵SUBTOTAL↵TOTAL TAX↵2.19 F↵2.19↵.00↵TOTAL↵Cash↵Cash↵2.19↵TENDER↵CHANGE↵2.25↵.06↵NUMBER OF ITEMS↵49 Oper 394 Term: 94 Store: 2190↵16:23:50↵Trx:↵07/22/15↵Thank You For Shopping At↵'
        }
      }
    ]
  }
}


type Props = {};

export default class App extends Component {
  state = {
    groceryItems: []

  }

  //invokes OCR (GOOGLE VISION API), if milk is found in the response body, then post request using
 //fetch API to Google Firebase
 //GOAL: postItem will get invoked with user takes photo of receipt on their phone
  postItem =  async () => {
    try {
      //calls getOCR and if milk is include in the response, post the milk entry and expiration date to the database
      let milkFound = this.getOCR()
      if (milkFound){
        console.log('milk found!')
        await fetch('https://grocerlert.firebaseio.com//places.json', {
          method: 'POST',
          body: JSON.stringify({
            item: 'milk',
            daysExpire: this.addDays(new Date(),5)
          })
        })
      }
      else {
        console.log('no milk')
      }
    }
    catch (error) {console.log(error)}
  }

  addDays = function(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }

  //gets all the milk entires and expiration dates from firebase with fetch API
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

  //post request to GOOGLE CLOUD VISION api using axios.post which returns an array with the text parsed
  //GOAL: Loop through that array and find milk
  // getOCR =  async () => {
  //   let body = {
  //     "requests": [
  //       {
  //         "image": {
  //           //USE FOR PUBLIC URLS OR GOOGLE CLOUD STORED IMAGES
  //           "source": {
  //             "imageUri": "https://firebasestorage.googleapis.com/v0/b/grocerlert.appspot.com/o/milk_receipt_2.jpg?alt=media&token=8c4e577e-14fd-44c5-b56e-7e526eb00257" //image URL
  //           }
  //           // "content":BASE_64
  //         },
  //         "features": [
  //           {
  //             "type": "TEXT_DETECTION",
  //             "maxResults": 1
  //           }
  //         ]
  //       }
  //     ]
  //   }
  //   try {
  //     let response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
  //      body)
  //     console.log('GOOGLE', response)
  //     let OCR_fullTextAnnotation = response.data.responses[0].fullTextAnnotation.text

  //     console.log('GOOGLE FULL TEXT ANNOT', OCR_fullTextAnnotation)
  //     let OCR_lowerCase = OCR_fullTextAnnotation.toLowerCase()
  //     if (OCR_lowerCase.includes('milk')) {
  //          return true
  //        }
  //        else return false
  //  }
  //  catch (error) {console.log(error)}

    //   LOOP THRU RESPONSE HERE
    //  IF MILK IS FOUND, RETURN TRUE
    //  ELSE RETURN FALSE
    //  when switching to OCR, use respones.data and put back async and await
    //  let OCR_fullTextAnnotation = OCR_RESPONSE.data.responses[0].fullTextAnnotation.text
    //  console.log('OCR_fullTextAnnotation:', OCR_fullTextAnnotation)
    //  let OCR_lowerCase = OCR_fullTextAnnotation.toLowerCase()
    //  console.log('OCR_lowerCase:', OCR_fullTextAnnotation)
    //  if (OCR_lowerCase.includes('milk')) {
    //    return true
    //  }
    //  else return false



  render() {

    return (
      <View style={styles.container}>

      <FlatList
      data={this.state.groceryItems}
      renderItem={({item}) =>
          <Text>Item: {item.item} Expires in {item.daysExpire} days</Text>
      }
      />

        <Button title="Post Milk" onPress={this.postItem} />
        <Button title="Get Milk" onPress={this.getItem} />

        <ImageSelection />
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
