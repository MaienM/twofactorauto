import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import { connect } from 'react-redux';
import { deleteEntry } from '../../actions/entries';
import { dismiss } from '../../actions/navigation';
import { routes } from '../../constants';

const DeleteEntry = (props) => (
	<MaterialDialog
		title="Delete entry"
		okLabel="Cancel"
		onOk={props.onKeep}
		cancelLabel="Delete"
		onCancel={props.onDelete}
		visible
	>
		<Text>Delete {props.entry.name}?</Text>
	</MaterialDialog>
);

DeleteEntry.propTypes = {
	entry: PropTypes.shape({
		name: PropTypes.string.isRequired,
	}).isRequired,
	onKeep: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	entry: state.entries[ownProps.uuid],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onKeep: () => dispatch(dismiss(routes.entry.delete)),
	onDelete: () => {
		dispatch(deleteEntry(ownProps.uuid));
		dispatch(dismiss(routes.entry.delete));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEntry);

