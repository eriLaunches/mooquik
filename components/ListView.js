import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Button} from 'react-native';
import { Container, Content, ListItem, Text, Icon, Left, Body, Right } from 'native-base';
import {connect} from 'react-redux'
import {fetchGroceries} from '../store/reducer.js'
import Swipeout from 'react-native-swipeout';
import {removeGrocery} from '../store/reducer.js'


// Helper function to format Date (i.e. November 3rd, 2018 )
const formatDate = (date) => {
  const dateformat = require('dateformat')
  return dateformat(date, 'd')
}

//Object storing different icons depending on days til expiration
const iconInv = {
  happy: 'happy',
  sad:'sad',
  milk: 'beaker',
  alert:'alert'
}

//Swipe left to delete functionality
let swipeBtns = [{
  text: 'Delete',
  backgroundColor: '#C73E1D',
  underlayColor: 'white',
}];

class ListView extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.actions.onFetchGroceries()

  }

  getDays = (expDate) => {
    const todaysDate = formatDate(new Date())
    const dateExpired = formatDate(expDate)
    return dateExpired - todaysDate
  }


  render() {
    console.log("LISTVIEW PROPS,", this.props)
    return (
      <View style={styles.container}>
        <ScrollView>
          <Container>
            <Content>
              {
                this.props.groceries.map(item =>
                  <Swipeout right={[{text: 'Delete',
                    backgroundColor: '#C73E1D',
                    underlayColor: 'white',
                    onPress: () => { this.props.actions.onRemoveGrocery(item)}}]}
                    key={item.key} backgroundColor='white'>
                  <ListItem icon >
                    <Left>
                      {
                        this.getDays(item.daysExpire) < 0 ?
                        <Icon active name={iconInv.sad} style={{color:'#AFA98D'}} />
                        :
                        this.getDays(item.daysExpire) <= 2 ?
                        <Icon active name={iconInv.alert} style={{color:'#C73E1D'}} />
                        :<Icon active name={iconInv.milk} style={{color:'#39A9DB'}}/>
                      }
                    </Left>
                    <Body>
                      <Text style={{color:'#5E4955', fontFamily:'Chalkduster'}}>Milk</Text>
                    </Body>
                    <Right>
                      {
                        this.getDays(item.daysExpire) < 0 ?
                        <Text style={{color:'#E86252', fontFamily:'Avenir'} }>Expired</Text>
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
                  </Swipeout>

                )
              }
            </Content>
          </Container>
        </ScrollView>
      </View>
     )
  }
}


const styles = StyleSheet.create({
  container: {
    margin: 15
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold'
  }

});

const mapStateToProps = (state) => {
  return {
    groceries: state.groceries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      onFetchGroceries: function() {
        const thunk = fetchGroceries()
        dispatch(thunk)
      },
      onRemoveGrocery: function(grocery) {
        const thunk = removeGrocery(grocery)
        dispatch(thunk)
      }

    }
  }
}

const ConnecListView = (connect(mapStateToProps, mapDispatchToProps)(ListView))

export default ConnecListView
