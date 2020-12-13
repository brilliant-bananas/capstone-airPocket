import axios from 'axios'
//action type
const GET_CATEGORIES = 'GET_CATEGORIES'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const ADD_CATEGORY = 'ADD_CATEGORY'

//action creator for Add category
const addCategory = (category) => ({
  type: ADD_CATEGORY,
  category,
})

export const addCategoryThunk = (name) => {
  return async (dispatch) => {
    try {
      const {data: newCategory} = await axios.post('/api/categories', {
        name: name,
      })
      dispatch(addCategory(newCategory))
    } catch (error) {
      console.error('Error adding categories from api')
    }
  }
}

//action creator
const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
})

const setUpdatedCategory = (updatedCategory) => {
  return {
    type: UPDATE_CATEGORY,
    updatedCategory,
  }
}

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const {data: categories} = await axios.get('/api/categories')
      dispatch(getCategories(categories))
    } catch (error) {
      console.error('Error fetching categories from api')
    }
  }
}

export const updatedSingleCategory = (categoryInfo) => {
  return async (dispatch) => {
    try {
      const {id, name} = categoryInfo
      console.log('The category info for updated category:', {name: name})
      const {data: updatedCategory} = await axios.put(
        `/api/categories/${id}`,
        categoryInfo
      )
      dispatch(setUpdatedCategory(updatedCategory))
    } catch (error) {
      console.log('Error updating category')
    }
  }
}

const initialState = []
export default function categories(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    case ADD_CATEGORY:
      return [...state, action.category]
    default:
      return state
  }
}
