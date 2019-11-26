import React from 'react';
import { ActivityIndicator, Text, Modal, Platform, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import Feed from './screens/Feed';
import Reviews from './screens/Reviews';
import ToggleableEventForm from './components/ToggleableEventForm';
import { newEvent, newEvents } from './utils/EventUtils';

export default class App extends React.Component {
  state = {
    showModal: false,
    selectedItemId: null,
    reviewsForItem: {},
    events: [],
    loading: true,
    error: false,
  }

  handleCreateSubmit = async event => {
      const { events } = this.state;

      this.setState({
        events: [await newEvent(event), ...events],
      });
  }

  openReviewScreen = id => {
    this.setState({
      showModal: true,
      selectedItemId: id,
    });
  };

  closeReviewScreen = () => {
    this.setState({
      showModal: false,
      selectedItemId: null,
    });
  };

  onSubmitReview = (text) => {
    const { selectedItemId, reviewsForItem } = this.state;
    const reviews = reviewsForItem[selectedItemId] || [];

    const updated = {
      ...reviewsForItem,
      [selectedItemId]: [...reviews, text],
    };

    this.setState({ reviewsForItem: updated });
  };
  
  async componentDidMount() {
    const { events } = this.state;

    console.log("+++++++++++++++++++++++++");

    try {
      const items = await newEvents();

      this.setState({
        loading: false,
        events: events.concat(items),
      });
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        error: true,
      });
    }
  }


  render() {
    const { selectedItemId, reviewsForItem, showModal, events, loading, error } = this.state;

    if (loading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text style={styles.error}>Error...</Text>;
    }

    return (
      <View style={styles.container}>
        <ToggleableEventForm 
          style={styles.plus}
          onFormSubmit={this.handleCreateSubmit}
        />
        <Feed 
          events={events}
          style={styles.feed} 
          reviewsForItem={reviewsForItem}
          onPressReviews={this.openReviewScreen}
        />
        <Modal
          visible={showModal}
          animation="slide"
          onRequestClose={this.closeReviewScreen}
        >
          <Reviews
            style={styles.reviews}
            reviews={reviewsForItem[selectedItemId] || []}
            onClose={this.closeReviewScreen}
            onSubmitReview={this.onSubmitReview}
          />
        </Modal>
      </View>
    );

  }
}

const platformVersion = 
  Platform.OS === 'ios'
    ? parseInt(Platform.Version, 10)
    : Platform.Version;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  plus: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
      ? Constants.statusBarHeight
      : 0,
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
      ? Constants.statusBarHeight
      : 0,
  },
  reviews: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' && platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
  error: {
    flex: 1,
    marginLeft: 20,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
      ? Constants.statusBarHeight + 80
      : 80,
  }
});
