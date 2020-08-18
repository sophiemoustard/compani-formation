import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MARGIN, ICON } from '../styles/metrics';
import { GREY } from '../styles/colors';
import moment from '../core/helpers/moment';

const OnSiteHoursDisplay = ({ startDate, endDate }) => (
  <View style={styles.datesAndArrowContainer}>
    <Text style={styles.hours}>{moment(startDate).format('HH:mm')}</Text>
    <View style={styles.arrow}>
      <Feather name="arrow-right" size={ICON.XS} color={GREY[400]} />
    </View>
    <Text style={styles.hours}>{moment(endDate).format('HH:mm')}</Text>
  </View>
);

OnSiteHoursDisplay.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

const styles = StyleSheet.create({
  datesAndArrowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hours: {
    lineHeight: 24,
    fontSize: 16,
  },
  arrow: {
    marginHorizontal: MARGIN.XS,
    marginTop: MARGIN.XS,
  },
});

export default OnSiteHoursDisplay;
