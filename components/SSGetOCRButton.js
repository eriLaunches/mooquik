import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View, Button, FlatList} from 'react-native';
import axios from 'axios'

const API_KEY = 'AIzaSyBWm5aQTSWyffTokyKlsX03j7d9hIgH7Q0'

class GetOCRButton extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  getOCR =  async () => {
    let body = {
      "requests": [
        {
          "image": {
            //USE FOR PUBLIC URLS OR GOOGLE CLOUD STORED IMAGES
            // "source": {
            //   "imageUri": "https://firebasestorage.googleapis.com/v0/b/grocerlert.appspot.com/o/milk_receipt_2.jpg?alt=media&token=8c4e577e-14fd-44c5-b56e-7e526eb00257" //image URL
            // }
            "content":this.props.receipt
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
      if (OCR_lowerCase.includes('milk')) {
          console.log('OCR Found milk')
          return true
         }
         else {alert('No Milk Found On Your Receipt')}

   }
   catch (error) {console.log(error)}
  }
  render() {
    console.log("getOCR",typeof this.props.receipt)
    return (
      <Button title="Get OCR" onPress={this.getOCR} />

     );
  }
}

export default GetOCRButton;
