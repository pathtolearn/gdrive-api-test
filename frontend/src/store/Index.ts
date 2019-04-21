import { combineReducers } from 'redux';
import { downloadFilesAndFoldersReducer, fileDownloadReducer, uploadedFileReducer, isLoadingReducer } from '../shared/reducers/Reducers';

export const rootReducer = combineReducers({
    filesAndFolders: downloadFilesAndFoldersReducer,
    downloadedFilePath: fileDownloadReducer,
    uploadedFile: uploadedFileReducer,
    isLoading: isLoadingReducer
});