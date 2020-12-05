import React from 'react'
import CameraFeed from './camera-feed'

const uploadImageFromCamera = async blob => {
  // Create Http Request Instance.
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      console.log(xhttp.responseText)
  }

  // Converting blob to file
  let file = new File([blob], 'receipt.png', {type: 'image/png'})

  const formData = new FormData()
  formData.append('photo', file)
  xhttp.open('POST', 'api/camera/upload', true)
  xhttp.send(formData)
}

const uploadImageFromForm = async file => {
  // Create Http Request Instance.
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      console.log(xhttp.responseText)
  }

  const formData = new FormData()
  formData.append('photo', file)
  xhttp.open('POST', 'api/camera/upload', true)
  xhttp.send(formData)
}

export default class Camera extends React.Component {
  // componentDidMount() {
  //   try {
  //     this.props.postCameraThunk()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  render() {
    return (
      <div>
        <h1>Image capture test</h1>
        <p>Capture image from USB webcamera and upload to form</p>
        <CameraFeed
          uploadImageFromCamera={uploadImageFromCamera}
          uploadImageFromForm={uploadImageFromForm}
        />
      </div>
    )
  }
}
