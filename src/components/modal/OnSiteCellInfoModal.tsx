import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { StepType } from 'types/StepType';
import moment from '../../core/helpers/moment';
import InfoModal from './InfoModal';
import { BORDER_WIDTH, MARGIN } from '../../styles/metrics';
import { GREY, PINK } from '../../styles/colors';
import { capitalizeDate } from '../../core/helpers/utils';
import OnSiteHoursDisplay from '../OnSiteHoursDisplay';

interface OnSiteCellInfoModalProps {
  visible: boolean,
  title: string,
  stepSlots: Array<StepType>,
  onRequestClose: () => ({}),
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

  const infoModalContent = () => {
    const formattedStepSlots = formatStepSlotsForFlatList(stepSlots);
    return (
      <View>
        <FlatList
          ItemSeparatorComponent={() => (<View style={styles.stepInfoSeparator} />)}
          data={formattedStepSlots}
          renderItem={({ item }) => stepInfoItem(item)}
          keyExtractor={item => item.slots._id}
          scrollEnabled={formattedStepSlots.length > 3}
        />
      </View>
    );
  };

  const stepInfoItem = stepSlot => (
    <View>
      <Text style={styles.date}>{capitalizeDate(stepSlot?.slots[0]?.startDate)}</Text>
      <FlatList
        horizontal
        ItemSeparatorComponent={() => (<View style={styles.separator} />)}
        data={stepSlot.slots}
        keyExtractor={item => item._id}
        renderItem={({ item }) => onSiteHoursDisplayItem(item)}
      />
      <Text style={styles.address}>{stepSlot?.slots[0]?.address?.fullAddress || ''}</Text>
    </View>
  );

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
    color: GREY[600],
    fontSize: 16,
    lineHeight: 16,
  },
  address: {
    color: PINK[600],
    fontSize: 16,
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
});

export default OnSiteCellInfoModal;
