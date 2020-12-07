import React from 'react'
import CameraFeed from './camera-feed'

const uploadImageFromCamera = async (blob) => {
  // Create Http Request Instance.
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
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

const uploadImageFromForm = async (file) => {
  // Create Http Request Instance.
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200)
      console.log(xhttp.responseText)
  }

  const formData = new FormData()
  formData.append('photo', file)
  xhttp.open('POST', 'api/camera/upload', true)
  xhttp.send(formData)
}

export default class Camera extends React.Component {
  render() {
    return (
      <div>
        <h3>Create a new Transaction</h3>
        <CameraFeed
          uploadImageFromCamera={uploadImageFromCamera}
          uploadImageFromForm={uploadImageFromForm}
        />
      </div>
    )
  }
}
