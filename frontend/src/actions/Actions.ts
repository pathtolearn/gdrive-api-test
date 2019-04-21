import { Folders, FETCH_FILES_AND_FOLDERS_REQUEST_SUCCESS, FetchFileActionSuccess, FolderContents, DownloadFile, DownloadFileSuccess, DOWNLOAD_FILE_SUCCESS, UPLOAD_FILE_SUCCESS, UploadFileSuccessAction, LoaderRequest, FETCH_FILES_AND_FOLDERS_REQUEST, UPLOAD_FILE_REQUEST } from "./ActionTypes";
import { fetchFilesAndFolders, fetchFolderContents, fetchFile, uploadFileToFolder } from "../utils/ApiManager";


export const loaderRequest = (type: string): LoaderRequest => {
    return {
        type
    }
}

export const uploadFileSucess = (folder: Folders): UploadFileSuccessAction => {
    return {
        type: UPLOAD_FILE_SUCCESS,
        payload: folder
    }
}

export const receiveFilesAndFolders = (data: Folders[]): FetchFileActionSuccess => {
    return {
        type: FETCH_FILES_AND_FOLDERS_REQUEST_SUCCESS,
        payload: data
    }
}

export const receiveDownloadedFile = (filePath: string): DownloadFileSuccess => {
    return {
        type: DOWNLOAD_FILE_SUCCESS,
        payload: filePath
    }
}

export const getFilesAndFolders = (fetchFolder: FolderContents) => dispatch => {
    dispatch(loaderRequest(FETCH_FILES_AND_FOLDERS_REQUEST));
    fetchFilesAndFolders(fetchFolder).then(response => {
        return dispatch(receiveFilesAndFolders(response.data));
    }).catch(err => {
        alert(err);
        console.log(err);
    });
}

export const getFolderContents = (folderConents: FolderContents) => dispatch => {
    dispatch(loaderRequest(FETCH_FILES_AND_FOLDERS_REQUEST));
    fetchFolderContents(folderConents).then(response => {
        return dispatch(receiveFilesAndFolders(response.data));
    }).catch(err => {
        alert(err);
        console.log(err);
    });
}

export const downloadFile = (file: DownloadFile) => dispatch => {
    fetchFile(file).then(response => {
        return dispatch(receiveDownloadedFile(response.data));
    }).catch(err => {
        alert(err);
        console.log(err);
    });
}

export const uploadFile = (data: FormData) => dispatch => {
    dispatch(loaderRequest(UPLOAD_FILE_REQUEST));
    uploadFileToFolder(data).then(response => {
        alert("file upload success");
        return dispatch(uploadFileSucess(response.data));
    }).catch(err => {
        alert(err);
        console.log(err);
    });
}