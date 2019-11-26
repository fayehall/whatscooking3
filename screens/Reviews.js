import React from 'react';
import { SafeAreaView, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import ReviewInput from '../components/ReviewInput';
import ReviewList from '../components/ReviewList';
import NavigationBar from '../components/NavigationBar';

export default function Reviews({
	style,
	reviews,
	onClose,
	onSubmitReview,
}) {
	return (
		<SafeAreaView style={style}>
			<NavigationBar
				title="Reviews"
				leftText="Close"
				onPressLeftText={onClose}
			/>
			<ReviewInput
				placeholder="Write a review here..."
				onSubmit={onSubmitReview}
			/>
			<ReviewList items={reviews} />
		</SafeAreaView>
	);
}

Reviews.propTypes = {
	style: ViewPropTypes.style,
	reviews: PropTypes.arrayOf(PropTypes.string).isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmitReview: PropTypes.func.isRequired,
};

Reviews.defaultProps = {
	style: null,
};