import axios from 'axios'
const GET_CATEGORIES = 'GET_CATEGORIES'
const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})
export const fetchCategories = () => {
  return async dispatch => {
    try {
      const {data: categories} = await axios.get('/api/categories')
      dispatch(getCategories(categories))
    } catch (error) {
      console.error('Error fetching categories from api')
    }
  }
}
const initialState = []
export default function categories(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
