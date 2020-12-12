import React from 'react'
import CameraFeed from './camera-feed'
import NewTransForm from './createTransaction'

export default class Camera extends React.Component {
  constructor(props) {
    super(props)
    this.uploadImageFromCamera = this.uploadImageFromCamera.bind(this)
    this.uploadImageFromForm = this.uploadImageFromForm.bind(this)
  }

  uploadImageFromCamera = async (
    imageBlob,
    categoryId,
    renderModal,
    changeModalMessage
  ) => {
    // Create Http Request Instance.
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        changeModalMessage('SUCCESS', 'Successfully uploaded receipt!')
      } else if (this.status == 400) {
        changeModalMessage('ERROR', 'Could not read receipt from photo!')
      }
    }

    // Converting blob to file
    let file = new File([imageBlob], 'receipt.png', {type: 'image/png'})

    const formData = new FormData()
    formData.append('photo', file)
    formData.append('categoryId', categoryId)
    xhttp.open('POST', 'api/camera/upload', true)
    xhttp.send(formData)
  }

  uploadImageFromForm = async (
    file,
    categoryId,
    renderModal,
    changeModalMessage
  ) => {
    // Create Http Request Instance.
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        changeModalMessage('SUCCESS', 'Successfully uploaded receipt!')
      } else if (this.status == 400) {
        changeModalMessage(
          'ERROR',
          'Could not read receipt from uploaded image!'
        )
      }
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

  render() {
    return (
      <div>
        <h3>Create a new Transaction</h3>
        <CameraFeed
          uploadImageFromCamera={this.uploadImageFromCamera}
          uploadImageFromForm={this.uploadImageFromForm}
        />
        <br />
        <NewTransForm />
      </div>
    )
  }
}
