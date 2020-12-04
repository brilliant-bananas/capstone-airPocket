import axios from 'axios'

//ACTION TYPE
const SET_SINGLE_TRANSACTION = 'SET_SINGLE_TRANSACTION '
const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION'
const DELETE_TRANSACTION = 'DELETE_TRANSACTION'

//ACTION CREATOR
export const setSingleTransaction = transaction => ({
  type: SET_SINGLE_TRANSACTION,
  transaction
})

export const updateTransactionById = (firstName, lastName, email) => ({
  type: UPDATE_STUDENT,
  firstName,
  lastName,
  email
})

export const unregisterStudentById = (studentId, campusId) => ({
  type: UNREGISTER_STUDENT,
  studentId,
  campusId
})

//THUNK
export const fetchSingleStudent = studentId => {
  return async dispatch => {
    try {
      const {data: student} = await axios.get(`/api/students/${studentId}`)
      dispatch(setSingleStudent(student))
    } catch (err) {
      console.error('Oops, the student seems to fail to get loaded', err)
    }
  }
}

export const unregisterStudent = studentId => {
  return async dispatch => {
    try {
      const {data: unregisteredInfo} = await axios.put(
        `/api/students/${studentId}`,
        {campusId: null}
      )
      console.log(unregisteredInfo)
      const {campusId} = unregisteredInfo
      dispatch(unregisterStudentById(studentId, campusId))
    } catch (err) {
      console.error('Oops, the student seems to fail to get unregistered', err)
    }
  }
}

export const updateStudent = (studentId, name, studentEmail) => {
  return async dispatch => {
    try {
      const nameArray = name.split(' ')
      const {data: updateStudentInfo} = await axios.put(
        `/api/students/${studentId}`,
        {
          firstName: nameArray[0],
          lastName: nameArray[1],
          email: studentEmail
        }
      )
      const {firstName, lastName, email} = updateStudentInfo
      dispatch(updateStudentById(firstName, lastName, email))
    } catch (err) {
      console.error('Oops, the student seems to fail to get updated', err)
    }
  }
}

//INITIAL STATE
const initialState = {}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function singleStudentReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_STUDENT: {
      return action.student
    }
    case UNREGISTER_STUDENT: {
      return {...state, campusId: action.campusId}
    }
    case UPDATE_STUDENT: {
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email
      }
    }
    default: {
      return state
    }
  }
}
