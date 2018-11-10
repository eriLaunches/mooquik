import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements'



class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryItems: []
     }
  }

  componentDidMount() {
    this.getItem()
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

  render() {
    return (
      // this.state.groceryItems ?
      //   <FlatList
      //   style = {styles.container}
      //   data={this.state.groceryItems}
      //   renderItem={({item}) =>
      //       <Text>Item: {item.item} Expires in {item.daysExpire} days</Text>
      //   }
      //   />
      // :
      //   <View />

      <View style={styles.container}>
        {
          this.state.groceryItems.map( item =>
            <ListItem  key={item.key} title={`${item.item} ${item.daysExpire}`}
              leftAvatar={
                {
                  source: {uri: 'https://d29fhpw069ctt2.cloudfront.net/icon/image/59543/preview.svg'}
                }
              }
             />
          )
        }
      </View>


     )
  }
}

export default ListView;

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },

});
