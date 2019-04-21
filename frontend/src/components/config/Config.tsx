import * as React from 'react'
import { FolderContents } from '../../actions/ActionTypes'

interface Props {
  handleConfigurationSubmit: any
}

type State = FolderContents;

class Config extends React.Component<Props, State> {
  state: Readonly<State> = {
    Authorization: '',
    calculateFolderPath: '',
    fetchTags: '',
    fields: '',
    includeTeamDrives: '',
    nextPage: '',
    orderBy: '',
    pageSize: '',
    path: '',
    teamDriveId: '',
    where: '',
  }

  closeModalDomRef = React.createRef<HTMLButtonElement>();

  updateState = <T extends string>(key: keyof State, value: T) => (
    prevState: State
  ): State => ({
    ...prevState,
    [key]: value,
  })

  handleInputChange = event => {
    // type stateKey = keyof State;
    const {
      target: { name, value },
    } = event

    // this.setState({
    //     [name] : value
    // })
    this.setState(this.updateState(name, value));
  }

  handleSubmit = () => {
      const { handleConfigurationSubmit } = this.props;
      handleConfigurationSubmit(this.state);
      this.closeModalDomRef.current.click();
  }

  render() {

    return (
      <div className="float-right">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#configModal"
        >
          Config
        </button>

        <div
          className="modal fade"
          id="configModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="configModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="configModalLabel">
                  Config
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="authorization">Authorization</label>
                        <input
                          type="text"
                          className="form-control"
                          id="authorization"
                          aria-describedby="authorization"
                          placeholder="Authorization"
                          name="Authorization"
                          value={this.state.Authorization}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="calculateFolderPath">
                          calculateFolderPath
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="calculateFolderPath"
                          name="calculateFolderPath"
                          value={this.state.calculateFolderPath}
                          onChange={this.handleInputChange}
                          aria-describedby="calculateFolderPath"
                          placeholder="calculateFolderPath"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="fetchTags">fetchTags</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fetchTags"
                          name="fetchTags"
                          value={this.state.fetchTags}
                          onChange={this.handleInputChange}
                          aria-describedby="fetchTags"
                          placeholder="fetchTags"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="fields">fields</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fields"
                          name="fields"
                          value={this.state.fields}
                          onChange={this.handleInputChange}
                          aria-describedby="fields"
                          placeholder="fields"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="path">path</label>
                        <input
                          type="text"
                          className="form-control"
                          id="path"
                          name="path"
                          value={this.state.path}
                          onChange={this.handleInputChange}
                          aria-describedby="path"
                          placeholder="path"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="includeTeamDrives">
                          includeTeamDrives
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="includeTeamDrives"
                          name="includeTeamDrives"
                          value={this.state.includeTeamDrives}
                          onChange={this.handleInputChange}
                          aria-describedby="includeTeamDrives"
                          placeholder="includeTeamDrives"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="nextPage">nextPage</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nextPage"
                          name="nextPage"
                          value={this.state.nextPage}
                          onChange={this.handleInputChange}
                          aria-describedby="nextPage"
                          placeholder="nextPage"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="orderBy">orderBy</label>
                        <input
                          type="text"
                          className="form-control"
                          id="orderBy"
                          name="orderBy"
                          value={this.state.orderBy}
                          onChange={this.handleInputChange}
                          aria-describedby="orderBy"
                          placeholder="orderBy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="pageSize">pageSize</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pageSize"
                          name="pageSize"
                          value={this.state.pageSize}
                          onChange={this.handleInputChange}
                          aria-describedby="pageSize"
                          placeholder="pageSize"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="teamDriveId">teamDriveId</label>
                        <input
                          type="text"
                          className="form-control"
                          id="teamDriveId"
                          name="teamDriveId"
                          value={this.state.teamDriveId}
                          onChange={this.handleInputChange}
                          aria-describedby="teamDriveId"
                          placeholder="pageSize"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="where">where</label>
                        <input
                          type="text"
                          className="form-control"
                          id="where"
                          name="where"
                          value={this.state.where}
                          onChange={this.handleInputChange}
                          aria-describedby="where"
                          placeholder="pageSize"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  ref={this.closeModalDomRef}
                >
                  Close
                </button>
                <button type="button" onClick={this.handleSubmit} className="btn btn-primary">
                  Fetch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Config
