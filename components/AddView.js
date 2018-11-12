import React, { Component } from 'react'
import {Platform, StyleSheet, View, FlatList, Image} from 'react-native';
import { Container, Header, Content, Icon, Text, Button } from 'native-base';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux'
import {fetchGroceries} from '../store/reducer.js'
import axios from 'axios'


var ImagePicker = require('react-native-image-picker')

var cookieMonster = require('./img/cookie_monster.png')


const API_KEY = 'AIzaSyBWm5aQTSWyffTokyKlsX03j7d9hIgH7Q0'

//for testing
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

class AddView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: null
     }

     this.pickImage = this.pickImage.bind(this)
  }

  // componentDidMount(){
  //   this.props.onFetchGroceries()
  // }

  //Prompts user to pick an image from their library...OPEN: get them to take a picture
  pickImage() {
    const options = {
      title: 'Mooquick!',
      takePhotoButtonTitle: 'Take photo with your camera',
      chooseFromLibraryButtonTitle: 'Choose photo from library'
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }

      else {
        this.setState({
          base64: response.data
        });

        this.getOCR()
      }
    });
  }

  //Sends receipt image that user picks to the Google Cloud Vision OCR API which returns an object with the text
  // Loop through the object to find if it contains "milk", if it does, invoke the postItem function
  getOCR =  async () => {
    let body = {
      "requests": [
        {
          "image": {
            //USE FOR PUBLIC URLS OR GOOGLE CLOUD STORED IMAGES
            // "source": {
            //   "imageUri": "https://firebasestorage.googleapis.com/v0/b/grocerlert.appspot.com/o/milk_receipt_2.jpg?alt=media&token=8c4e577e-14fd-44c5-b56e-7e526eb00257" //image URL
            // }
            "content":this.state.base64
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
      let OCR_fullTextAnnotation = response.data.responses[0].fullTextAnnotation.text
      console.log('GOOGLE FULL TEXT ANNOT', OCR_fullTextAnnotation)
      let OCR_lowerCase = OCR_fullTextAnnotation.toLowerCase()
      console.log('OCR LOWER CASE:', OCR_lowerCase)
      if (OCR_lowerCase.includes('milk') || OCR_lowerCase.includes('mlk') ) {
          console.log('OCR Found milk')
          this.postItem()
         }
         else {
           alert('No Milk Found On Your Receipt')
         }
   }
   catch (error) {console.log(error)}

    //For Testing: when switching to OCR, put back async and await
    //  let OCR_fullTextAnnotation = OCR_RESPONSE.data.responses[0].fullTextAnnotation.text
    //  let OCR_lowerCase = OCR_fullTextAnnotation.toLowerCase()
    //  console.log('Test_OCR_fullTextAnnotation:', OCR_fullTextAnnotation)
    //  console.log('Test_OCR_lowerCase:', OCR_lowerCase)
    //  if (OCR_lowerCase.includes('milk')) {
    //   console.log('OCR Found milk')
    //   this.postItem()
    //   this.navigateToListView()

    //  }
    //  else alert('No Milk Found On Your Receipt')
  }

//If Milk is on the receipt, post milk to the Firebase database w/ days til expiration from today's date
  postItem =  async () => {
    try {
        console.log('posting milk to firebase database')
        await fetch('https://grocerlert.firebaseio.com//places.json', {
          method: 'POST',
          body: JSON.stringify({
            item: 'milk',
            daysExpire: this.addDays(new Date(),7)
          })
        })
        console.log('posted to the firebase db')
        this.navigateToListView()

    }
    catch (error) {console.log(error)}
  }


  async navigateToListView () {
    await this.props.onFetchGroceries()
    this.props.navigation.navigate('List')

  }

  refreshFunction(){
    this.forceUpdate()
  }

  addDays = function(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }

  render() {
    return (
      <View>
      <Image source={cookieMonster} style={{
        width:575,
        height:575,
        resizeMode:'contain'}}/>
        <Button bordered dark small primary style={{alignSelf: 'center', marginTop:5, marginleft:5, borderColor:'black'}} onPress={this.pickImage}>
            <Icon name='ios-camera' style={{color:'#5E4955', fontSize:20}} />
            <Text style={{color:'#5E4955', fontFamily:'Avenir', fontWeight: 'bold', fontSize:15}}>YES!</Text>
        </Button>
      </View>
     );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  }
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

const ConnectAddView = (connect(mapStateToProps, mapDispatchToProps)(AddView))

export default ConnectAddView
