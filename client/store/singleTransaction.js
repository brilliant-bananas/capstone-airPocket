import axios from 'axios'

//ACTION TYPE
const SET_SINGLE_TRANSACTION = 'SET_SINGLE_TRANSACTION '
const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION'
const DELETE_TRANSACTION = 'DELETE_TRANSACTION'

//ACTION CREATOR
export const setOneTransaction = (transaction) => ({
  type: SET_SINGLE_TRANSACTION,
  transaction,
})

export const updateTransactionById = (transactionId, updateInfo) => ({
  type: UPDATE_TRANSACTION,
  transactionId,
  updateInfo,
})

export const removeOneTransaction = (transactionId) => ({
  type: DELETE_TRANSACTION,
  transactionId,
})

//THUNK
export const fetchOneTransaction = (transactionId) => {
  return async (dispatch) => {
    try {
      const {data: transaction} = await axios.get(
        `/api/transactions/${transactionId}`
      )
      debugger
      dispatch(setOneTransaction(transaction))
    } catch (err) {
      console.error('Oops, the transaction seems to fail to get loaded', err)
    }
  }
}

export const updateOneTransaction = (transactionId, transactionInfo) => {
  return async (dispatch) => {
    try {
      const {data: updateInfo} = await axios.put(
        `/api/transactions/${transactionId}`,
        transactionInfo
      )
      dispatch(updateTransactionById(transactionId, updateInfo))
    } catch (err) {
      console.error('Oops, the transaction seems to fail to get updated', err)
    }
  }
}

export const deleteOneTransaction = (transactionId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/transactions/${transactionId}`)
      dispatch(removeOneTransaction(transactionId))
    } catch (error) {
      console.error('Error deleting single transaction', error)
    }
  }
}

//INITIAL STATE
const initialState = {}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_TRANSACTION: {
      return action.transaction
    }
    default: {
      return state
    }
  }
}
