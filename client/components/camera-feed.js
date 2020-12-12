import React, {Component} from 'react'
import {Spinner, Modal} from 'react-bootstrap'
import Categories from './categories'
import axios from 'axios'

export default class CameraFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      categoryId: '',
      showModal: false,
      modalTitle: 'Processing...',
      modalBody: 'Processing your receipt and saving data...',
      showSpinner: true,
    }
    this.getImageBlobFromCanvas = this.getImageBlobFromCanvas.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.renderModal = this.renderModal.bind(this)
    this.changeModalMessage = this.changeModalMessage.bind(this)
    this.resetModalMessage = this.resetModalMessage.bind(this)
  }

  getImageBlobFromCanvas(canvas) {
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        resolve(blob)
      })
    })
  }

  resetModalMessage() {
    this.setState({
      modalTitle: 'Processing...',
      modalBody: 'Processing your receipt and saving data...',
      showSpinner: true,
    })
  }

  renderModal() {
    this.resetModalMessage()
    this.setState({showModal: !this.state.showModal})
  }

  changeModalMessage(title, body) {
    this.setState({modalTitle: title, modalBody: body, showSpinner: false})
  }

  // uploading photo
  async onFormSubmit(e) {
    e.preventDefault()
    this.renderModal()
    await this.props.uploadImageFromForm(
      this.state.file,
      this.state.categoryId,
      this.renderModal,
      this.changeModalMessage
    )
  }

  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  /**
   * Processes available devices and identifies one by the label
   * @memberof CameraFeed
   * @instance
   */
  processDevices(devices) {
    devices.forEach((device) => {
      console.log(device.label)
      this.setDevice(device)
    })
  }

  /**
   * Sets the active device and starts playing the feed
   * @memberof CameraFeed
   * @instance
   */
  async setDevice(device) {
    const {deviceId} = device
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {deviceId},
    })
    this.videoPlayer.srcObject = stream
    this.videoPlayer.play()
  }

  /**
   * On mount, grab the users connected devices and process them
   * @memberof CameraFeed
   * @instance
   * @override
   */
  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices()
    this.processDevices(cameras)
  }

  /**
   * Handles taking a still image from the video feed on the camera
   * @memberof CameraFeed
   * @instance
   */
  takePhoto = async () => {
    const context = this.canvas.getContext('2d')
    //getImagen from canvas
    context.drawImage(this.videoPlayer, 0, 0, 680, 360)
    this.renderModal()
    let imageBlob = await this.getImageBlobFromCanvas(this.canvas)
    this.props.uploadImageFromCamera(
      imageBlob,
      this.state.categoryId,
      this.renderModal,
      this.changeModalMessage
    )
  }

  onCategoryChange = (categoryId) => {
    this.setState({categoryId})
  }

  render() {
    return (
      <div className="c-camera-feed">
        <Categories
          initialCategoryId={this.state.categoryId}
          onCategoryChange={this.onCategoryChange}
        />
        <div className="c-camera-feed__viewer">
          <video
            ref={(ref) => (this.videoPlayer = ref)}
            width="80%"
            height="80%"
          />
        </div>

        <button className="btn btn-warning" onClick={this.takePhoto}>
          Take photo!
        </button>
        <div className="c-camera-feed__stage" style={{display: 'none'}}>
          <canvas
            id="image"
            width="300"
            height="150"
            ref={(ref) => (this.canvas = ref)}
          />
        </div>
        <form onSubmit={this.onFormSubmit}>
          <h3>Receipt Upload</h3>
          <input type="file" name="myImage" onChange={this.onChange} />

          <button className="btn btn-success" type="submit">
            Upload
          </button>
        </form>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({showModal: false})}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.state.modalBody}</h4>
            {this.state.showSpinner && (
              <Spinner animation="border" variant="success" />
            )}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
