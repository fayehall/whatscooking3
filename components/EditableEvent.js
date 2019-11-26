import React from 'react';
import PropTypes from 'prop-types';

import EventForm from './EventForm';
import Event from './Event';

export default class EditableEvent extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		onFormSubmit: PropTypes.func.isRequired,
		onRemovePress: PropTypes.func.isRequired,
	};

	state = {
		editFormOpen: false,
	};

	handleEditPress = () => {
		this.openForm();
	};

	handleFormClose = () => {
		this.closeForm();
	};

	handleSubmit = event => {
		const { onFormSubmit } = this.props;

		onFormSubmit(event);
		this.closeForm();
	};

	closeForm = () => {
		this.setState({ editFormOpen: false });
	};

	openForm = () => {
		this.setState({ editFormOpen: true });
	};

	render() {
		const { id, 
				author,
				title, 
				description, 
				onRemovePress, 
		} = this.props;
		const { editFormOpen } = this.state;
	
		if (editFormOpen) {
			return (
				<EventForm 
					id={id} 
					author={author}
					title={title} 
					description={description} 
					onFormSubmit={this.handleSubmit}
					onFormClose={this.handleFormClose}
				/>
			); 
		}

		return (
			<Event 
				id={id}
				author={author}
				title={title}
				description={description}
				onEditPress={this.handleEditPress}
				onRemovePress={onRemovePress}
			/>
		);
	}
}