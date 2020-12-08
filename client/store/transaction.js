import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
const CREATE_TRANSACTION = 'CREATE_TRANSACTION'

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

export const createTransaction = (transaction) => ({
  type: CREATE_TRANSACTION,
  transaction,
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

export const createNewTransaction = (
  storeName,
  amount,
  date,
  categoryId
) => async (dispatch) => {
  try {
    amount = Number(amount)
    debugger
    const {date: newTransaction} = await axios.post('/api/transactions', {
      storeName: storeName,
      amount: amount,
      date: date,
      categoryId: categoryId,
    })
    dispatch(createTransaction(newTransaction))
  } catch (error) {
    console.error('Error create new transaction: ', error)
  }
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return action.transactions
    case CREATE_TRANSACTION:
      return [...state, action.transaction]
    default:
      return state
  }
}
