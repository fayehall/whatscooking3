import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import EventButton from './EventButton';

export default class Event extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		onEditPress: PropTypes.func.isRequired,
		onRemovePress: PropTypes.func.isRequired,
	};


	handleRemovePress = () => {
		const { id, onRemovePress } = this.props;
		onRemovePress(id);
	};

	render() {
		const { author, title, description, onEditPress } = this.props;

		return (
			<View style={styles.eventContainer}>
				<Text style={styles.title}>{author}</Text>
				<Text style={styles.title}>{title}</Text>
				<Text>{description}</Text>
				<View style={styles.buttonGroup}>
					<EventButton 
						color="blue" 
						small 
						title="Edit" 
						onPress={onEditPress}
					/>
					<EventButton 
						color="blue" 
						small 
						title="Remove" 
						onPress={this.handleRemovePress}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	eventContainer: {
		backgroundColor: 'white',
		borderColor: '#d6d7da',
		borderWidth: 2,
		borderRadius: 10,
		padding: 15,
		marginBottom: 0,

	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',

	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',

	},
})