import * as React from "react";

import { Folders, DownloadFile, FolderContents } from "../../actions/ActionTypes";
import BreadCrumbs from "../breadcrumbs/BreadCrumbs";
import Config from "../config/Config";
import Loader from "../loader/Loader";

interface Props {
  filesAndFolders: Folders[];
  getFilesAndFolders: Function;
  getFolderContents: Function;
  downloadFile: Function;
  downloadedFilePath: string;
  isLoading: boolean;
}

interface State {
  filesAndFolders: Folders[];
  cardsPerRow: number;
  folderConfig: FolderContents;
}

class FilesAndFoldersView extends React.Component<Props, State> {
  state: Readonly<State> = {
    filesAndFolders: [],
    cardsPerRow: 4,
    folderConfig: null
  };

  callGetFolders = (path?: string) => {
    const { getFolderContents } = this.props;
    const { folderConfig } = this.state;
    if(path) {
      folderConfig.path = path;
    }
    getFolderContents(folderConfig);
  }


  handleLinkClick = (breadCrumbs: string[], index: number) => {
    const seletedPath = breadCrumbs.slice(1, index + 1).join("/");
    this.callGetFolders(`/${seletedPath}`);
  };

  getCurrentDirectoryPath = (folder: Folders): string[] => {
    const pathArray = ["Home", ...folder.path.split("/")].filter(e => e !== "");
    return pathArray.splice(0, pathArray.length - 1);
  };

  getRowFolders = (cardsPerRow: number, startIndex: number): Folders[] => {
    let { filesAndFolders } = this.props;

    if (startIndex + cardsPerRow <= filesAndFolders.length)
      return filesAndFolders.slice(startIndex, startIndex + cardsPerRow);
    else {
      const length = filesAndFolders.length - (startIndex + cardsPerRow);
      return filesAndFolders.slice(startIndex, startIndex + length);
    }
  };

  downloadFile = (folder: Folders) => {
    const { downloadFile } = this.props;
    const { folderConfig } = this.state;
    const file: DownloadFile = {
      Authorization: folderConfig.Authorization,
      id: folder.id,
      calculateFolderPath: folderConfig.calculateFolderPath,
      includeTeamDrives: folderConfig.includeTeamDrives
    };
    downloadFile(file);
  };

  handleFolderClick = (folder: Folders) => {
    if (folder.directory) {
      this.callGetFolders(folder.path);
    }
  }

  handleConfigurationSubmit = (data: FolderContents) => {
    this.setState({
      folderConfig: data
    }, () => {
      this.callGetFolders();
    });
  }


  render() {
    let { filesAndFolders, isLoading } = this.props;

    const { cardsPerRow } = this.state;
    const totalRecords: number = filesAndFolders.length;
    const totalRows: number[] = Array(
      Math.ceil(totalRecords / cardsPerRow)
    ).fill(0).map((e, i) => e = i + 1);

    return (
      <div>
        <Loader isLoading={isLoading} />
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <BreadCrumbs
                breadCrumbs={
                  filesAndFolders.length > 0
                    ? this.getCurrentDirectoryPath(filesAndFolders[0])
                    : []
                }
                linkClick={this.handleLinkClick}
              />
            </div>
            <div className="col-sm mt-2">
              <Config handleConfigurationSubmit={this.handleConfigurationSubmit} />
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className="container">
          {totalRows.map((r, i) => (
            <div key={r} className="card-deck">
              {this.getRowFolders(cardsPerRow, i * cardsPerRow).map(folder => (
                <div key={folder.id} className="card my-3" onClick={() => this.handleFolderClick(folder)}>
                  <img
                    src={
                      folder.directory
                        ? "https://img.icons8.com/dusk/512/000000/folder-invoices.png"
                        : "https://img.icons8.com/cotton/512/000000/document.png"
                    }
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{folder.name}</h4>
                    <p className="card-text">{folder.path}</p>
                    <p className="card-text">{folder.id}</p>
                    {!folder.directory && (
                      <button
                        onClick={() => this.downloadFile(folder)}
                        className="btn btn-primary"
                        type="button"
                      >
                        Download
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FilesAndFoldersView;
