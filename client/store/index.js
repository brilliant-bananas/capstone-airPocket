import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import camera from './camera'
import transaction from './transaction'
import singleTransaction from './singleTransaction'
import categories from './categories'

const reducer = combineReducers({
  user: user,
  transactions: transaction,
  categories: categories,
  camera: camera,
  singleTransaction: singleTransaction,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
