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
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
  }

  // uploading photo
  async onFormSubmit(e) {
    e.preventDefault()
    this.setState({
      showModal: true,
    })

    await this.props.uploadImageFromForm(this.state.file, this.state.categoryId)

    this.setState({
      showModal: false,
    })
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
  takePhoto = () => {
    const context = this.canvas.getContext('2d')
    //getImagen from canvas
    context.drawImage(this.videoPlayer, 0, 0, 680, 360)
    this.canvas.toBlob(this.props.uploadImageFromCamera, this.state.categoryId)
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
            width="400"
            heigh="150"
          />
        </div>

        <button className="btn btn-warning" onClick={this.takePhoto}>
          Take photo!
        </button>
        <div className="c-camera-feed__stage">
          <canvas
            id="image"
            width="400"
            heigh="150"
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
            <Modal.Title>Processing..</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Processing your receipt and saving data...</h4>
            <Spinner animation="border" variant="success" />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
