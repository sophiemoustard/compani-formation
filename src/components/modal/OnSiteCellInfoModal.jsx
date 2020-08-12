import React from 'react';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import moment from '../../core/helpers/moment';
import CloseButtonModal from './CloseButtonModal';
import { ICON, BORDER_WIDTH, MARGIN } from '../../styles/metrics';
import { GREY, PINK } from '../../styles/colors';
import { capitalize } from '../../core/helpers/utils';

const OnSiteCellInfoModal = ({ visible, title, stepSlots, onRequestClose }) => {
  const infoModalContent = () => (
    <View>
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={styles.stepInfoSeparator} />
        )}
        data={removeDuplicateStartDate(stepSlots)}
        renderItem={({ item }) => stepInfoItem(item)}
        keyExtractor={item => item._id}
        scrollEnabled={removeDuplicateStartDate(stepSlots).length > 3}
      />
    </View>
  );

  const stepInfoItem = stepSlot => (
    <View style={styles.content}>
      <Text style={styles.date}>{
        capitalize(`${moment(stepSlot.startDate).format('dddd Do')
        } ${capitalize(moment(stepSlot.startDate).format('MMMM YYYY'))}`)
      }</Text>
      <FlatList
        horizontal
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        data={stepSlots.filter(
          element => moment(element.startDate).format('MMMM Do YYYY')
          === moment(stepSlot.startDate).format('MMMM Do YYYY')
        )}
        renderItem={({ item }) => (
          <View style={styles.datesAndArrowContainer}>
            <Text style={styles.hours}>{moment(item.startDate).format('hh:mm')}</Text>
            <View style={styles.arrow}>
              <Feather name="arrow-right" size={ICON.XS} color={GREY[400]} />
            </View>
            <Text style={styles.hours}>{moment(item.endDate).format('hh:mm')}</Text>
          </View>
        )}
        keyExtractor={item => item._id}
      />
      <Text style={styles.address}>{stepSlot?.address?.fullAddress || ''}</Text>
    </View>
  );

  const removeDuplicateStartDate = array => array
    .map(e => moment(e.startDate).format('MMMM Do YYYY'))
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => array[e])
    .map(e => array[e]);

  return (
    <CloseButtonModal
      visible={visible}
      title={title}
      content={infoModalContent()}
      onRequestClose={onRequestClose}
    />
  );
};

OnSiteCellInfoModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  stepSlots: PropTypes.array,
  onRequestClose: PropTypes.func,
};

const styles = StyleSheet.create({
  stepInfoSeparator: {
    marginBottom: MARGIN.MD,
  },
  separator: {
    height: 16,
    borderLeftWidth: BORDER_WIDTH,
    borderLeftColor: GREY[300],
    marginHorizontal: MARGIN.SM,
    alignSelf: 'center',
  },
  datesAndArrowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: GREY[600],
    fontSize: 16,
    lineHeight: 16,
  },
  hours: {
    lineHeight: 24,
    fontSize: 16,
  },
  arrow: {
    marginHorizontal: MARGIN.XS,
    marginTop: MARGIN.XS,
  },
  address: {
    color: PINK[600],
    fontSize: 16,
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  content: {
  },
});

export default OnSiteCellInfoModal;
