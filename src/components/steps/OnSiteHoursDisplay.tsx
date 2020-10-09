import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MARGIN, ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import moment from '../../core/helpers/moment';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';

interface OnSiteHoursDisplayProps {
  startDate: Date,
  endDate: Date,
}

const OnSiteHoursDisplay = ({ startDate, endDate }: OnSiteHoursDisplayProps) => (
  <View style={styles.datesAndArrowContainer}>
    <Text style={styles.hours}>{moment(startDate).format('HH:mm')}</Text>
    <View style={styles.arrow}>
      <Feather name="arrow-right" size={ICON.XS} color={GREY[400]} />
    </View>
    <Text style={styles.hours}>{moment(endDate).format('HH:mm')}</Text>
  </View>
);

const styles = StyleSheet.create({
  datesAndArrowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hours: {
    ...FIRA_SANS_REGULAR.MD,
  },
  arrow: {
    marginHorizontal: MARGIN.XS,
    marginTop: MARGIN.XS,
  },
});

export default OnSiteHoursDisplay;
