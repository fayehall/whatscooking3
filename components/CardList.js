import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import Card from './Card';

const keyExtractor = ({ id }) => id.toString();

export default class CardList extends React.Component {
	static propTypes = {
		items: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				author: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
				image: PropTypes.string.isRequired,
			}),
		).isRequired,
		reviewsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string),).isRequired,
		onPressReviews: PropTypes.func.isRequired,
	};

	renderItem = ({ item: { id, author, title, description, image } }) => {
		const { reviewsForItem, onPressReviews } = this.props;
		const reviews = reviewsForItem[id];

		return (
			<Card
				id={id}
				fullname={author}
				image={{uri: image,}}
				title={title}
				description={description}
				linkText={`${reviews ? reviews.length : 0} Reviews`}
				onPressLinkText={() => onPressReviews(id)}
			/>
		)
	};

	render() {
		const { items, reviewsForItem } = this.props;

		return (
			<FlatList
				data={items}
				renderItem={this.renderItem}
				keyExtractor={keyExtractor}
				extraData={reviewsForItem}
			/>
		);
	}
}