import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import moment from '../../../core/helpers/moment';
import styles from './style';

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

export default OnSiteHoursDisplay;
