import React from 'react'
import CameraFeed from './camera-feed'
import NewTransForm from './createTransaction'

const uploadImageFromCamera = async (blob, categoryId) => {
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
  formData.append('categoryId', categoryId)
  xhttp.open('POST', 'api/camera/upload', true)
  xhttp.send(formData)
}

const uploadImageFromForm = async (file, categoryId) => {
  // Create Http Request Instance.
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200)
      console.log(xhttp.responseText)
  }

  const formData = new FormData()
  formData.append('photo', file)
  formData.append('categoryId', categoryId)
  xhttp.open('POST', 'api/camera/upload', true)
  xhttp.send(formData)

  await new Promise((resolve) => {
    xhttp.onload = () => {
      resolve()
    }
  })
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
        <br />
        <NewTransForm />
      </div>
    )
  }
}
