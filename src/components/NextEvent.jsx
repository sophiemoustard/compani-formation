import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { GREY } from '../styles/variables';

const NextEvent = ({ event }) => {
  const day = moment(event.date).date();
  const month = moment(event.date).format('MMM');
  const title = event.program.substring(0, 40);
  return <View style={{...styles.container}}>
    <View style={{...styles.dateContainer}}>
      <Text style={{...styles.day}}>{day}</Text>
      <Text style={{...styles.month}}>{month}</Text>
    </View>
    <Text style={{...styles.title}}>{title}...</Text>
  </View>;
};

NextEvent.propTypes = {
  event: PropTypes.object,
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 170,
    borderWidth: 1,
    borderColor: GREY,
    borderRadius: 10,
    marginRight: 10,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: GREY,
    padding: 5,
  },
  day: {
    fontSize: 28,
  },
  month: {
    fontSize: 18,
  },
  title: {
    flexShrink: 1,
    padding: 5,
  }
});

export default NextEvent;
