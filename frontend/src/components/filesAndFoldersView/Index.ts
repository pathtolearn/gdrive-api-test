// Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FilesAndFoldersView from './FilesAndFoldersView';
import { getFilesAndFolders, getFolderContents , downloadFile} from '../../actions/Actions';
import { Folders } from '../../actions/ActionTypes';

// Mapping our Redux State to Props
const mapStateToProps = ({ filesAndFolders, downloadedFilePath, isLoading }) => {
    return {filesAndFolders, downloadedFilePath, isLoading}
};
// Binding our fetchCoins action.
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getFilesAndFolders,
        getFolderContents,
        downloadFile
    },
    dispatch
);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilesAndFoldersView);