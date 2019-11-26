import React from 'react';
import { StyleSheet, Image, View, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';

import AuthorRow from './AuthorRow';

export default class Card extends React.Component {
	static propTypes = {
		fullname: PropTypes.string.isRequired,
		linkText: PropTypes.string,
		onPressLinkText: PropTypes.func,
		image: Image.propTypes.source.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}

	static defaultProps = {
		linkText: '',
		onPressLinkText: () => {},
	}

	state = {
		loading: true,
	};

	handleLoad = () => {
		this.setState({ loading: false });
	};

	render() {
		const { fullname, linkText, onPressLinkText, image, title, description } = this.props;
		const { loading } = this.state;

		return (
			<View>
				<AuthorRow
					fullname={fullname}
					linkText={linkText}
					onPressLinkText={onPressLinkText}
				/>
				<View style={styles.image}>
					{loading && (
						<ActivityIndicator
							style={StyleSheet.absoluteFill}
							size={'large'}
						/>
					)}

					<Image
						style={StyleSheet.absoluteFill}
						source={image}
						onLoad={this.handleLoad}
					/>
				</View>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>				
			</View>

		);
	}
}

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1,
		backgroundColor: 'rgba(0,0,0,0.2)',
	},
	title: {
		marginLeft: 10,
		fontSize: 14,
		fontWeight: 'bold',
	},
	description: {
		marginLeft: 10,
		marginBottom: 10,
	},

})