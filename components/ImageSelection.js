import React, { Component } from 'react'
// import ImagePicker from 'react-native-image-picker'
var ImagePicker = require('react-native-image-picker')
import {StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native'



class ImageSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    }
    this.pickImage = this.pickImage.bind(this)
  }

  pickImage() {

    const options = {
      title: 'my pic app',
      takePhotoButtonTitle: 'Take photo with you camera',
      chooseFromLibraryButtonTitle: 'Choose photo from Library'
    }
    // alert('clicked')
    console.log("HERE",ImagePicker)
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      // else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      // }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }


  render() {
    console.log("avatarSource",this.state.avatarSource)
    return (
      <View>
      <Image source={this.state.avatarSource} style={{width:50, height:50, margin:10}}/>
      <TouchableOpacity style={{backgroundColor:'green', margin:10, padding:10}} onPress={this.pickImage}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

export default ImageSelection;

