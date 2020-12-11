import axios from 'axios'
//action type
const GET_CATEGORIES = 'GET_CATEGORIES'
const UPDATE_CATEGORY = "UPDATE_CATEGORY"

//action creator
const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

const setUpdatedCategory = (updatedCategory) => {
  return {
    type:UPDATE_CATEGORY,
    updatedCategory,
  }
}
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

export const updatedSingleCategory = (categoryInfo)  => {
    return async (dispatch) => {
      try {
        const { id, name } = categoryInfo
        console.log("The category info for updated category:", { name: name });
        const { data: updatedCategory } = await axios.put(
          `/api/categories/${id}`, 
          categoryInfo
        );
        console.log("the updated items are", updatedCategory)
        dispatch(setUpdatedCategory(updatedCategory))
      } catch (error) {
        console.log("Error updating category")
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
