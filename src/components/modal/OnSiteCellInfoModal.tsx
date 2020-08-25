import React from 'react';
import { View, StyleSheet, Text, FlatList, Platform, Linking, TouchableOpacity } from 'react-native';
import { CourseSlotType } from '../../types/CourseSlotType';
import moment from '../../core/helpers/moment';
import InfoModal from './InfoModal';
import { BORDER_WIDTH, MARGIN } from '../../styles/metrics';
import { GREY, PINK } from '../../styles/colors';
import OnSiteHoursDisplay from '../OnSiteHoursDisplay';
import { NUNITO_SEMI, FIRA_SANS_REGULAR } from '../../styles/fonts';

interface OnSiteCellInfoModalProps {
  visible: boolean,
  title: string,
  stepSlots: Array<CourseSlotType>,
  onRequestClose: () => void,
}

const OnSiteCellInfoModal = ({ visible, title, stepSlots, onRequestClose }: OnSiteCellInfoModalProps) => {
  const openMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${37.484847},${-122.148386}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    }) || '';

    Linking.openURL(url);
  };
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

  const infoModalContent = () => {
    const formattedStepSlots = formatStepSlotsForFlatList(stepSlots);
    return (
      <View>
        <FlatList
          ItemSeparatorComponent={() => (<View style={styles.stepInfoSeparator} />)}
          data={formattedStepSlots}
          renderItem={({ item }) => stepInfoItem(item)}
          keyExtractor={item => item.startDate}
          scrollEnabled={formattedStepSlots.length > 3}
        />
      </View>
    );
  };

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
          <TouchableOpacity onPress={openMaps}>
            <Text style={styles.address}>{address}</Text>
          </TouchableOpacity>)}
      </View>
    );
  };

  const onSiteHoursDisplayItem = stepSlot => (
    <OnSiteHoursDisplay startDate={stepSlot.startDate} endDate={stepSlot.endDate} />
  );

  return (
    <InfoModal visible={visible} title={title} content={infoModalContent()} onRequestClose={onRequestClose} />
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
});

export default OnSiteCellInfoModal;
