import {
	ActivityIndicator,
	Text,
	ViewPropTypes,
	SafeAreaView,
} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

import CardList from '../components/CardList';

export default class Feed extends React.Component {
	static propTypes = {
		style: ViewPropTypes.style,
		reviewsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string),).isRequired,
		onPressReviews: PropTypes.func.isRequired,
	};

	static defaultProps = {
		style: null,
	};

	render() {
		const { style, onPressReviews, reviewsForItem, events } = this.props;

		return (
			<SafeAreaView style={style}>
				<CardList 
					items={events} 
					onPressReviews={onPressReviews} 
					reviewsForItem={reviewsForItem}
				/>
			</SafeAreaView>
		);
	}
}