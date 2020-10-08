import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Linking, TouchableOpacity } from 'react-native';
import { CourseSlotType } from '../../types/CourseSlotType';
import moment from '../../core/helpers/moment';
import NiModal from '../modal';
import IconButton from '../IconButton';
import { BORDER_WIDTH, MARGIN, ICON } from '../../styles/metrics';
import { GREY, PINK } from '../../styles/colors';
import OnSiteHoursDisplay from '../OnSiteHoursDisplay';
import { NUNITO_SEMI, FIRA_SANS_REGULAR, FIRA_SANS_BOLD } from '../../styles/fonts';

interface OnSiteCellInfoModalProps {
  visible: boolean,
  title: string,
  stepSlots: Array<CourseSlotType>,
  onRequestClose: () => void,
}

const OnSiteCellInfoModal = ({ visible, title, stepSlots, onRequestClose }: OnSiteCellInfoModalProps) => {
  const formatStepSlotsForFlatList = (slots) => {
    const formattedSlots = slots.reduce((acc, slot) => {
      const startDate = moment(slot.startDate).format('DD/MM/YYYY');
      if (acc[startDate]) acc[startDate].push(slot);
      else acc[startDate] = [slot];
      return acc;
    },
    {});

    return Object.keys(formattedSlots).map(key => ({ startDate: key, slots: formattedSlots[key] }));
  };

  const [formattedStepSlots] = useState(formatStepSlotsForFlatList(stepSlots));

  const openMaps = async address => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);

  const stepInfoItem = (stepSlot) => {
    const address = stepSlot?.slots[0]?.address?.fullAddress;

    return (
      <View>
        <Text style={styles.date}>{moment(stepSlot.slots[0].startDate).format('dddd Do MMMM')}</Text>
        <FlatList
          horizontal
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={stepSlot.slots}
          keyExtractor={item => item._id}
          renderItem={({ item }) => onSiteHoursDisplayItem(item)}
        />
        {address && (
          <TouchableOpacity onPress={() => openMaps(address)}>
            <Text style={styles.address}>{address}</Text>
          </TouchableOpacity>)}
      </View>
    );
  };

  const onSiteHoursDisplayItem = stepSlot => (
    <OnSiteHoursDisplay startDate={stepSlot.startDate} endDate={stepSlot.endDate} />
  );

  return (
    <NiModal visible={visible}>
      <View style={styles.header}>
        <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={3}>{title}</Text>
        <IconButton name='x-circle' onPress={onRequestClose} size={ICON.LG}
          color={GREY[500]} style={styles.closeButton}/>
      </View>
      <FlatList ItemSeparatorComponent={() => (<View style={styles.stepInfoSeparator} />)} data={formattedStepSlots}
        renderItem={({ item }) => stepInfoItem(item)} keyExtractor={item => item.startDate}
        scrollEnabled={formattedStepSlots.length > 3} />
    </NiModal>
  );
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
  date: {
    ...NUNITO_SEMI.XS,
    color: GREY[600],
    textTransform: 'uppercase',
  },
  address: {
    ...FIRA_SANS_REGULAR.MD,
    color: PINK[600],
    textDecorationLine: 'underline',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: MARGIN.XL,
  },
  title: {
    ...FIRA_SANS_BOLD.MD,
    flex: 1,
  },
  closeButton: {
    alignItems: 'flex-end',
  },
});

export default OnSiteCellInfoModal;
