import axios from 'axios'

const GET_BUDGETS = 'GET_BUDGETS'
const UPDATE_BUDGET = 'UPDATE_BUDGET'
const DELETE_BUDGET = 'DELETE_BUDGET'

const getBudgets = (budgets) => ({
  type: GET_BUDGETS,
  budgets,
})

const updatedBudget = (budget) => ({
  type: UPDATE_BUDGET,
  budget,
})

const deletedBudget = (budget) => ({
  type: DELETE_BUDGET,
  budget,
})

export const fetchBudgets = (userId, period) => {
  return async (dispatch) => {
    try {
      const {data: budgets} = await axios.get(
        `/api/budgets/${userId}?period=${period}`
      )
      dispatch(getBudgets(budgets))
    } catch (error) {
      console.error('Error fetching budgets from api')
    }
  }
}

export const updateBudget = (budgetId, budgetInfo) => {
  return async (dispatch) => {
    try {
      const {data: budget} = await axios.put(
        `/api/budgets/${budgetId}`,
        budgetInfo
      )
      dispatch(updatedBudget(budget))
    } catch (error) {
      console.error('Error updating budget from api')
    }
  }
}

export const deleteBudget = (budgetId) => {
  return async (dispatch) => {
    try {
      const {data: budget} = await axios.delete(`/api/budgets/${budgetId}`)
      dispatch(deletedBudget(budget))
    } catch (error) {
      console.error('Error updating budget from api')
    }
  }
}

const initialState = []
export default function budgets(state = initialState, action) {
  switch (action.type) {
    case GET_BUDGETS:
      return action.budgets
    case UPDATE_BUDGET:
      return state.map((budget) =>
        budget.id == action.budget.id
          ? {
              ...budget,
              total: action.budget.total,
            }
          : budget
      )
    case DELETE_BUDGET:
      return state.filter((budget) => budget.id != action.budget.id)
    default:
      return state
  }
}
