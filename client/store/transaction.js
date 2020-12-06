import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_TRANSACTIONS = 'SET_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const setTransactions = (transactions) => ({
  type: SET_TRANSACTIONS,
  transactions,
})

/**
 * THUNK CREATORS
 */
export const fetchTransactions = () => async (dispatch) => {
  try {
    const {data: transactions} = await axios.get('/api/transactions')
    dispatch(setTransactions(transactions))
  } catch (error) {
    console.error('Error fetching transactions: ', error)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}
