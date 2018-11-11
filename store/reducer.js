import axios from 'axios'

const initialState = {
  groceries: []
}

//ACTION TYPE
export const GOT_GROCERIES = 'GET_GROCERIES'

//ACTION CREATOR
export const gotGroceries = (groceries) => ({
  type: GOT_GROCERIES,
  groceries
})

//THUNK CREATOR
export const fetchGroceries = () =>  {
  return async (dispatch) => {
    try {
      const itemsArr = []
         const response = await fetch('https://grocerlert.firebaseio.com//places.json')
         let parsedRes = await response.json()
         for (const key in parsedRes) {
           itemsArr.push({
             item: parsedRes[key].item,
             daysExpire: parsedRes[key].daysExpire,
             key:key
           })
         }
         const action = gotGroceries(itemsArr)
         dispatch(action)
      }

     catch (err) {
      console.log(err)
    }
  }
 }



//REDUCER
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_GROCERIES:
      return { ...state, groceries: action.groceries }
    default:
      return state
  }
}
