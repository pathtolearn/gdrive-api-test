import { Folders, FETCH_FILES_AND_FOLDERS_REQUEST_SUCCESS, FetchFilesAndFoldersSuccess, DownloadFileSuccess, DOWNLOAD_FILE_SUCCESS, UPLOAD_FILE_SUCCESS, FETCH_FILES_AND_FOLDERS_REQUEST, UPLOAD_FILE_REQUEST } from "../../actions/ActionTypes";

interface AppState {
    filesAndFolders: Folders[];
    downloadedFilePath: string;
    uploadedFile: Folders;
    isLoading: boolean;
}

export const initialState: AppState = {
    filesAndFolders: [],
    downloadedFilePath: "",
    uploadedFile: null,
    isLoading: false
}

export const downloadFilesAndFoldersReducer = (
    state: AppState = initialState,
    action: FetchFilesAndFoldersSuccess
) => {
    switch (action.type) {
        case FETCH_FILES_AND_FOLDERS_REQUEST_SUCCESS: {
            const { payload: filesAndFolders } = action;
            return filesAndFolders;
        }
        default:
            return state;
    }
}

export const fileDownloadReducer = (
    state: AppState = initialState,
    action: DownloadFileSuccess
) => {
    switch (action.type) {
        case DOWNLOAD_FILE_SUCCESS: {
            const { payload: downloadedFilePath } = action;
            return downloadedFilePath;
        }
        default:
            return state;
    }
}

export const uploadedFileReducer = (
    state: AppState = initialState,
    action: DownloadFileSuccess
) => {
    switch (action.type) {
        case UPLOAD_FILE_SUCCESS: {
            const { payload: uploadedFile } = action;
            return uploadedFile;
        }
        default:
            return state;
    }
}

export const isLoadingReducer = (
    state: AppState = initialState,
    action: DownloadFileSuccess
) => {
    switch (action.type) {
        case ([FETCH_FILES_AND_FOLDERS_REQUEST, UPLOAD_FILE_REQUEST].find(e => e === action.type)): {
            const isLoading = true;
            return isLoading;
        }
        case ([FETCH_FILES_AND_FOLDERS_REQUEST_SUCCESS, UPLOAD_FILE_SUCCESS].find(e => e === action.type)): {
            const isLoading = false;
            return isLoading;
        }
        default:
            return state;
    }
}