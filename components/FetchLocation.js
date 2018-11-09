import React from 'react'
import { Button, StyleSheet } from 'react-native';



const FetchLocation = props => {
  return (
    <Button
      onPress={props.onGetLocation}
      title="Get Location"
      color="#841584"

    />
  )
};


export default FetchLocation;



