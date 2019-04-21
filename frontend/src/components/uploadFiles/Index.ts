// Dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadFile} from '../../actions/Actions';
import UploadFilesToAFolder from './UploadFilesToAFolder';

// Mapping our Redux State to Props
const mapStateToProps = ({ uploadedFile, isLoading }) => {
    return {uploadedFile, isLoading}
};
// Binding our fetchCoins action.
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        uploadFile
    },
    dispatch
);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadFilesToAFolder);