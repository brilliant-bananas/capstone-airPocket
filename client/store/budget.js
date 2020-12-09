import axios from 'axios'

//action type
const SET_BUDGETS = 'SET_BUDGETS'
const ADD_BUDGET = 'ADD_BUDGET'
const REMOVE_STUDENT = 'REMOVE_BUDGET'

//action creator
export const setBudgets = (budgets) => {
  return {
    type: SET_BUDGETS,
    budgets,
  }
}
export const setNewBudget = (newBudget) => {
  return {
    type: ADD_BUDGET,
    newBudget,
  }
}

export const removedBudget = (budgetId) => {
  return {
    type: REMOVE_BUDGET,
    studentId,
  }
}

//thunk creator
export const fetchBudgets = () => {
  return async (dispatch) => {
    try {
      const {data: budgets} = await axios.get('/api/budgets')
      dispatch(setBudgets(budgets))
    } catch (error) {
      console.log('Something went wrong with budgets')
    }
  }
}

export const postNewBudget = (newBudgetObj) => {
  return async (dispatch) => {
    try {
      const {data: newBudget} = await axios.post('/api/budgets', newBudgetObj)
      dispatch(setNewBudget(newBudget))
    } catch (error) {
      console.log('Something went wrong with adding the budget')
    }
  }
}

export const deleteStudent = (budgetId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`api/budgets/${budgetId}`)
      dispatch(removeBudget(budgetId))
    } catch (error) {
      console.log('Error deleting student')
      // Dispatch our fetchBudgets thunk creator to retrieve all of our budgets from the database again
      dispatch(fetchBudgets())
    }
  }
}

const initialState = {
  newBudget: {},
}

export default function budgetReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUDGETS:
      return action.budgets
    case ADD_BUDGET:
      return {...state, newBudget: action.newBudget}

    default:
      return state
  }
}
