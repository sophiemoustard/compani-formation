import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import companiDate from '../../../core/helpers/dates';
import styles from './styles';

interface OnSiteHoursDisplayProps {
  startDate: Date,
  endDate: Date,
}

const OnSiteHoursDisplay = ({ startDate, endDate }: OnSiteHoursDisplayProps) => (
  <View style={styles.datesAndArrowContainer}>
    <Text style={styles.hours}>{companiDate(startDate).format('HH:mm')}</Text>
    <View style={styles.arrow}>
      <Feather name="arrow-right" size={ICON.XS} color={GREY[400]} />
    </View>
    <Text style={styles.hours}>{companiDate(endDate).format('HH:mm')}</Text>
  </View>
);

export default OnSiteHoursDisplay;
