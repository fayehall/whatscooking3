import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import EventButton from './EventButton';
import EventForm from './EventForm';

export default class ToggleableEventForm extends React.Component { 
	static propTypes = {
		onFormSubmit: PropTypes.func.isRequired,
	};

	state = {
		isOpen: false 
	};

	handleFormOpen = () => {
		this.setState({ isOpen: true });
	};

	handleFormClose = () => {
		this.setState({ isOpen: false });
	};

	handleFormSubmit = event => {
		const { onFormSubmit } = this.props;

		onFormSubmit(event);
		this.setState({ isOpen: false });

	};

	render() {
		const { isOpen } = this.state;

		return (
			<View style={[styles.container, !isOpen && styles.buttonPadding]}>
				{isOpen ? (
					<EventForm
						onFormSubmit={this.handleFormSubmit}
						onFormClose={this.handleFormClose}
					/>
				) : (
					<EventButton 
						title="+" 
						color="black" 
						onPress={this.handleFormOpen}
					/>
				)}
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingVertical: 10,
	},
	buttonPadding: {
		paddingHorizontal: 15,
	},
})