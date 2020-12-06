import axios from 'axios'
const GET_BUDGETS = 'GET_BUDGETS'
const getBudgets = (budgets) => ({
  type: GET_BUDGETS,
  budgets,
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
const initialState = []
export default function budgets(state = initialState, action) {
  switch (action.type) {
    case GET_BUDGETS:
      return action.budgets
    default:
      return state
  }
}
