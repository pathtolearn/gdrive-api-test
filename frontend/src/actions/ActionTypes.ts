export const UPLOAD_FILE_TO_A_FOLDER: string = "UPLOAD_FILE_TO_A_FOLDER";
export const FETCH_FILES_AND_FOLDERS_REQUEST: string = "FETCH_FILES_AND_FOLDERS_REQUEST";
export const FETCH_FILES_AND_FOLDERS_REQUEST_SUCCESS: string = "FETCH_FILES_AND_FOLDERS_REQUEST_SUCCESS";
export const DOWNLOAD_FILE_SUCCESS: string = "DOWNLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_REQUEST: string = "UPLOAD_FILE_REQUEST";
export const UPLOAD_FILE_SUCCESS: string = "UPLOAD_FILE_SUCCESS";

export interface FetchFolderCommon {
    Authorization: string;
    calculateFolderPath?: string;
    fetchTags?: string;
    fields?: string;
    includeTeamDrives?: string;
    nextPage?: string;
    orderBy?: string;
    pageSize?: string;
}

export interface FetchFolder extends FetchFolderCommon {
    id: string;
}

export interface FolderContents extends FetchFolderCommon {
    path: string;
    teamDriveId?: string;
    where?: string;
}

export interface Folders {
    path: string;
    createdDate: Date;
    size: number;
    parentFolderId: string;
    name: string;
    modifiedDate: Date;
    id: string;
    directory: boolean;
    properties: FolderProperties;
}

interface FolderProperties {
    thumbnailLink: string;
    mimeType: string;
}

interface UploadFileAction {
    type: typeof UPLOAD_FILE_TO_A_FOLDER;
    payload: Folders[]
}

export interface DownloadFile {
    Authorization: string;
    calculateFolderPath?: string;
    id: string;
    includeTeamDrives?: string
}

export interface DownloadFileSuccess {
    type: typeof DOWNLOAD_FILE_SUCCESS;
    payload: string;
}

export interface LoaderRequest {
    type: string;
}

export interface FetchFilesAndFoldersSuccess {
    type: typeof FETCH_FILES_AND_FOLDERS_REQUEST_SUCCESS;
    payload: Folders[];
}

export interface UploadFileSuccessAction {
    type: typeof UPLOAD_FILE_SUCCESS;
    payload: Folders;
}

export interface FileUpload {
    Authorization?: string;
    calculateFolderPath?: string;
    description?: string;
    folderId?: string;
    overwrite?: string;
    path?: string;
    size?: string;
    tags?: string;
    mimeType?: string;
}

type FileActions = UploadFileAction;
type FetchFileActionSuccess = FetchFilesAndFoldersSuccess;

export {
    FileActions,
    FetchFileActionSuccess
}