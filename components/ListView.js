import React, { Component } from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import { Container, Content, ListItem, Text, Icon, Left, Body, Right } from 'native-base';





// Helper function to format Date (i.e. November 3rd, 2018 )
const formatDate = (date) => {
  const dateformat = require('dateformat')
  return dateformat(date, 'd')
}


const iconInv = {
  happy: 'happy',
  sad:'sad',
  milk: 'beaker',
  alert:'alert'
}


const avatarIcon = "http://icons.iconarchive.com/icons/icons8/ios7/256/Food-Milk-icon.png"

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryItems: [],
      daysTilExp: null
     }
     this.getItem = this.getItem.bind(this)
  }

  componentDidMount() {
    this.getItem()
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log('this.shouldComponentUpdate', nextProps)
    return true
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

  getDays = (expDate) => {
    const todaysDate = formatDate(new Date())
    const dateExpired = formatDate(expDate)
    return dateExpired-todaysDate
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
        <ScrollView>
          <Container>
            <Content>
              {
                this.state.groceryItems.map(item =>
                  <ListItem icon key={item.key}>
                    <Left>
                      {
                        this.getDays(item.daysExpire) < 0 ?
                        <Icon active name={iconInv.sad} style={{color:'#E0A458'}} />
                        :
                        this.getDays(item.daysExpire) <= 2 ?
                        <Icon active name={iconInv.alert} style={{color:'#E87EA1'}} />
                        :<Icon active name={iconInv.milk} style={{color:'#78D5D7'}}/>
                      }
                    </Left>
                    <Body>
                      <Text style={{color:'#5E4955', fontFamily:'Chalkduster'}}>Milk</Text>
                    </Body>
                    <Right>
                      {
                        this.getDays(item.daysExpire) < 0 ?
                        <Text style={{color:'red', fontFamily:'Avenir'} }>Expired</Text>
                        :
                        this.getDays(item.daysExpire) === 0 ?
                        <Text style={{color:'#E86252', fontFamily:'Avenir'} }>Expires today!</Text>
                        : this.getDays(item.daysExpire) === 1 ?
                          <Text style={{color:'#E86252', fontFamily:'Avenir'} }>Expires in 1 day!</Text>
                        :
                        <Text style={{color:'#5E4955', fontFamily:'Avenir'}} >Expires in {this.getDays(item.daysExpire)} days</Text>
                      }

                    </Right>
                  </ListItem>

                )
              }


        </Content>

          </Container>
        </ScrollView>
      </View>


     )
  }
}

export default ListView;

const styles = StyleSheet.create({
  container: {
    margin: 15
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold'
  }

});
