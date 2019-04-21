import * as React from 'react'
import { shallow } from 'enzyme'
import FilesAndFoldersView from '../components/filesAndFoldersView/FilesAndFoldersView'

describe('FilesAndFoldersView Component ', () => {
  const props = {
    filesAndFolders: [],
    getFilesAndFolders: () => {},
    getFolderContents: () => {},
    downloadFile: () => {},
    downloadedFilePath: '',
    isLoading: false,
  }

  it('initial component state check', () => {
    const wrapper = shallow<FilesAndFoldersView>(<FilesAndFoldersView {...props} />)
    const instance = wrapper.instance()
    expect(instance.state.cardsPerRow).toEqual(4);
  })
})
