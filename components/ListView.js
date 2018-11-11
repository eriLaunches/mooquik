import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Button} from 'react-native';
import { Container, Content, ListItem, Text, Icon, Left, Body, Right } from 'native-base';
import {connect} from 'react-redux'
import {fetchGroceries} from '../store/reducer.js'

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

class ListView extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.onFetchGroceries()

  }

  getDays = (expDate) => {
    const todaysDate = formatDate(new Date())
    const dateExpired = formatDate(expDate)
    return dateExpired - todaysDate
  }


  render() {
    console.log("LISTVIEW,", this.props)
    return (
      <View style={styles.container}>
        <ScrollView>
          <Container>
            <Content>
              {
                this.props.groceries.map(item =>
                  <ListItem icon key={item.key}>
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
    onFetchGroceries: function() {
      const thunk = fetchGroceries()
      dispatch(thunk)
    }
  }
}

const ConnecListView = (connect(mapStateToProps, mapDispatchToProps)(ListView))

export default ConnecListView
