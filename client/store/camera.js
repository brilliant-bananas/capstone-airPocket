import axios from 'axios'

const GOT_CAMERA = 'GOT_CAMERA'

const gotCamera = (camera) => ({
  type: GOT_CAMERA,
  camera,
})

export const postCameraThunk = (photo) => {
  return async (dispatch) => {
    try {
      const {data: camera} = await axios.post('/api/camera/upload', {photo})
      dispatch(gotCamera(camera))
    } catch (error) {
      console.error('Error sending a post')
    }
  }
}

const initialState = {}

export default function camera(state = initialState, action) {
  switch (action.type) {
    case GOT_CAMERA:
      return action.camera
    default:
      return state
  }
}
