import axios from 'axios';

import { URL, uploadFile, folderContents, folders, downloadFilePath } from "../endpoints/EndPoints";
import { FolderContents, DownloadFile, FileUpload } from '../actions/ActionTypes';
import { getParamsAsUrl } from './Utils';


export const uploadFileToFolder = (data: FormData) => {
    const url: string = `${URL}${uploadFile}`;

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, data, config);
}

export const fetchFilesAndFolders = (data: FolderContents) => {
    return axios.get(`${URL}${folders}${getParamsAsUrl(data)}`);
}

export const fetchFolderContents = (data: FolderContents) => {
    return axios.get(`${URL}${folderContents}${getParamsAsUrl(data)}`);
}

export const fetchFile = (file: DownloadFile) => {
    return axios.get(`${URL}${downloadFilePath}${getParamsAsUrl(file)}`);
}