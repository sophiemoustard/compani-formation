import React from 'react';
import { View, Text, FlatList } from 'react-native';
import companiDate from '../../../core/helpers/dates';
import NiModal from '../../Modal';
import FeatherButton from '../../icons/FeatherButton';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import OnSiteInfoItem from '../OnSiteInfoItem';
import { SlotType } from '../../../types/CourseTypes';
import styles from './styles';

type OnSiteCellInfoModalProps = {
  visible: boolean,
  title: string,
  stepSlots: SlotType[],
  onRequestClose: () => void,
}

const formatStepSlots = (slots): { startDate: string, slots: SlotType[] }[] => {
  const formattedSlots = slots.reduce((acc, slot) => {
    const startDate = companiDate(slot.startDate).format('dd/LL/yyyy');
    if (acc[startDate]) acc[startDate].push(slot);
    else acc[startDate] = [slot];

    return acc;
  },
  {});

  return Object.keys(formattedSlots).map(key => ({ startDate: key, slots: formattedSlots[key] }));
};

const OnSiteCellInfoModal = ({ visible, title, stepSlots, onRequestClose }: OnSiteCellInfoModalProps) => (
  <NiModal visible={visible}>
    <View style={styles.header}>
      <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={3}>{title}</Text>
      <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[500]}
        style={styles.closeButton} />
    </View>
    <FlatList ItemSeparatorComponent={() => <View style={styles.stepInfoSeparator} />} scrollEnabled={true}
      data={formatStepSlots(stepSlots)} renderItem={({ item }) => <OnSiteInfoItem slots={item.slots} />}
      keyExtractor={item => item.startDate} />
  </NiModal>
);

export default OnSiteCellInfoModal;
