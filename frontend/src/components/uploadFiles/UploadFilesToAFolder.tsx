import * as React from 'react'
import { Folders, FileUpload } from '../../actions/ActionTypes'
import Loader from '../loader/Loader'

interface Props {
  uploadFile: Function
  uploadedFile: Folders
  isLoading: boolean
}

class UploadFilesToAFolder extends React.Component<Props> {
  state = {
    file: '',
    thumbnail: '',
    Authorization: '',
    calculateFolderPath: '',
    description: '',
    folderId: '',
    overwrite: '',
    path: '',
    size: '',
    tags: '',
    mimeType: '',
  }

  formData: FormData = new FormData()

  componentDidMount() {
    // this.initFormState()
  }

  handleFileUpload = (event, attName) => {
    event.preventDefault()
    const files = Array.from(event.target.files)

    this.formData.delete(attName)

    files.forEach((file: any, i) => {
      this.setState({ [attName]: file.name })
      this.formData.append(attName, file, file.name)
    })
  }

  handleInputChange = e => {
    const {
      target: { name, value },
    } = e
    this.setState({
      [name]: value,
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()

    const { uploadFile } = this.props

    const fileUpload: FileUpload = {
      Authorization: this.state.Authorization,
      calculateFolderPath: this.state.calculateFolderPath,
      description: this.state.description,
      folderId: this.state.folderId,
      overwrite: this.state.overwrite,
      path: this.state.path,
      size: this.state.size,
      tags: this.state.tags,
      mimeType: this.state.mimeType,
    }

    this.appendParamsToFormData(fileUpload, this.formData)

    uploadFile(this.formData)

    // this.initFormState()
  }

  appendParamsToFormData = (params, formData: FormData): FormData => {
    for (let key in params) {
      if (params[key]) {
        formData.delete(key)
        formData.append(key, params[key])
      }
    }
    return formData
  }

  initFormState = () => {
    this.state.Authorization = ''
    this.state.calculateFolderPath = ''
    this.state.description = ''
    this.state.folderId = ''
    this.state.overwrite = ''
    this.state.path = ''
    this.state.size = ''
    this.state.tags = ''
    this.state.file = ''
    this.state.thumbnail = ''

    this.formData = new FormData()
  }

  render() {
    const { isLoading } = this.props
    return (
      <div>
        <Loader isLoading={isLoading} />
        <div className="container mt-2">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group row">
              <label
                htmlFor="Authorization"
                className="col-sm-2 col-form-label"
              >
                <strong>Authorization</strong>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="authorization"
                  name="Authorization"
                  onChange={this.handleInputChange}
                  placeholder="Authorization"
                  value={this.state['Authorization']}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="calculateFolderPath"
                className="col-sm-2 col-form-label"
              >
                calculateFolderPath
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="calculateFolderPath"
                  name="calculateFolderPath"
                  onChange={this.handleInputChange}
                  value={this.state.calculateFolderPath}
                  placeholder="calculateFolderPath"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                description
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={this.handleInputChange}
                  value={this.state.description}
                  placeholder="description"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="file" className="col-sm-2 col-form-label">
                file
              </label>
              <div className="col-sm-10">
                <div className="custom-file">
                  <input
                    type="file"
                    name="file"
                    className="custom-file-input"
                    id="validatedCustomFile"
                    onChange={event => this.handleFileUpload(event, 'file')}
                    required
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="validatedCustomFile"
                  >
                    {this.state.file || 'Choose file...'}
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="folderId" className="col-sm-2 col-form-label">
                folderId
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="folderId"
                  name="folderId"
                  onChange={this.handleInputChange}
                  value={this.state.folderId}
                  placeholder="folderId"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="mimeType" className="col-sm-2 col-form-label">
                mimeType
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="mimeType"
                  name="mimeType"
                  onChange={this.handleInputChange}
                  value={this.state.mimeType}
                  placeholder="mimeType"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="overwrite" className="col-sm-2 col-form-label">
                overwrite
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="overwrite"
                  name="overwrite"
                  onChange={this.handleInputChange}
                  value={this.state.overwrite}
                  placeholder="overwrite"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="path" className="col-sm-2 col-form-label">
                path
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="path"
                  name="path"
                  onChange={this.handleInputChange}
                  value={this.state.path}
                  placeholder="path"
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="size" className="col-sm-2 col-form-label">
                size
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="size"
                  name="size"
                  onChange={this.handleInputChange}
                  placeholder="size"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="tags" className="col-sm-2 col-form-label">
                tags
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  name="tags"
                  onChange={this.handleInputChange}
                  value={this.state.tags}
                  placeholder="tags"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="thumbnail" className="col-sm-2 col-form-label">
                thumbnail
              </label>
              <div className="col-sm-10">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="validatedCustomFile"
                    name="thumbnail"
                    onChange={event =>
                      this.handleFileUpload(event, 'thumbnail')
                    }
                    required
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="validatedCustomFile"
                  >
                    {this.state.thumbnail || 'Choose file...'}
                  </label>
                </div>
              </div>
            </div>
            <div>
              <div className="float-right">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UploadFilesToAFolder
