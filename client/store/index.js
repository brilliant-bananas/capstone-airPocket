import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import camera from './camera'
import transaction from './transaction'
import categories from './categories'
import budgets from './budgets'
import budgetReducer from './budget'

const reducer = combineReducers({
  user: user,
  transactions: transaction,
  categories: categories,
  camera: camera,
  budgets: budgets,
  budget: budgetReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
