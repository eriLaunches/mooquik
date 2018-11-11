import axios from 'axios'
const initialState = {
  groceries: []
}

//ACTION TYPES
export const GOT_GROCERIES = 'GET_GROCERIES'
export const DELETE_GROCERY = 'DELETE_GROCERY'

//ACTION CREATORS
export const gotGroceries = (groceries) => ({
  type: GOT_GROCERIES,
  groceries
})

export const deleteGrocery = (grocery) => ({
  type: DELETE_GROCERY,
  grocery
})

//THUNK CREATORS
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

     catch (err) { console.log(err) }
  }
 }

 export const removeGrocery = (grocery) =>  {
  return async (dispatch) => {
    try {
      console.log("ARE YOU HITTING HERE?", grocery)
         await axios.delete(`https://grocerlert.firebaseio.com//places/${grocery.key}.json`)
         const action = deleteGrocery(grocery)
         dispatch(action)
      }
     catch (err) { console.log(err) }
  }
 }


//REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_GROCERIES:
      return { ...state, groceries: action.groceries }
    case DELETE_GROCERY: {
      const newGroceries =  state.groceries.filter(grocery => grocery.key !== action.grocery.key)
      return {...state, groceries:[...newGroceries]}
    }
    default:
      return state
  }
}
