import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import EventButton from './EventButton';

export default class EventForm extends React.Component {
	static propTypes = {
		id: PropTypes.string,
		author: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		onFormSubmit: PropTypes.func.isRequired,
		onFormClose: PropTypes.func.isRequired,
	};

	static defaultProps = {
		id: null,
		author: '',
		title: '',
		description: '',
	};

	constructor(props) {
		super(props);

		const { id, author, title, description, image } = props;

		this.state = {
			author: id ? author : '',
			title: id ? title : '',
			description: id ? description : '',
		};
	}


	handleAuthorChange = author => {
		this.setState({ author });
	};

	handleTitleChange = title => {
		this.setState({ title });
	};

	handleDescriptionChange = description => {
		this.setState({ description });
	};

	handleSubmit = () => {
		const { onFormSubmit, id } = this.props;
		const { author, title, description } = this.state;

		onFormSubmit({
			id,
			author,
			title,
			description,
		});
	};

	render() {
		const { id, onFormClose } = this.props;
		const { author, title, description } = this.state;

		const submitText = id ? 'Update' : 'Create';

		return (
			<View style={styles.formContainer}>
				<View style={styles.attributeContainer}>
					<Text style={styles.textInputTitle}>Author</Text>
					<View style={styles.textInputContainer}>
						<TextInput
							style={styles.textInput}
							underlineColorAndroid="transparent"
							onChangeText={this.handleAuthorChange}
							value={author}
						/>
					</View>
				</View>
				<View style={styles.attributeContainer}>
					<Text style={styles.textInputTitle}>Title</Text>
					<View style={styles.textInputContainer}>
						<TextInput
							style={styles.textInput}
							underlineColorAndroid="transparent"
							onChangeText={this.handleTitleChange}
							value={title}
						/>
					</View>
				</View>
				<View style={styles.attributeContainer}>
					<Text style={styles.textInputTitle}>Description</Text>
					<View style={styles.textInputContainer}>
						<TextInput
							style={styles.textInput}
							underlineColorAndroid="transparent"
							onChangeText={this.handleDescriptionChange}
							value={description}
						/>
					</View>
				</View>
				<View style={styles.buttonGroup}>
					<EventButton 
						small 
						color="#21BA45" 
						title={submitText} 
						onPress={this.handleSubmit}
					/>
					<EventButton 
						small 
						color="#DB2828" 
						title="Cancel" 
						onPress={onFormClose}
					/>
				</View>
			</View>
		);

	}
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: 'white',
		borderColor: '#D6D7DA',
		borderWidth: 2,
		borderRadius: 10,
		padding: 15,
		margin: 15,
		marginBottom: 0,

	},
	attributeContainer: {
		marginVertical: 8,

	},
	textInputContainer: {
		borderColor: '#D6D7DA',
		borderRadius: 2,
		borderWidth: 1,
		marginBottom: 5,

	},
	textInput: {
		height: 30,
		padding: 5,
		fontSize: 12,

	},
	textInputTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 5,

	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',

	},
})