// @ts-nocheck

import { View, Text, FlatList, ScrollView } from 'react-native';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import { ascendingSort } from '../../../core/helpers/dates/utils';
import { DD_MM_YYYY, IS_WEB } from '../../../core/data/constants';
import NiModal from '../../Modal';
import FeatherButton from '../../icons/FeatherButton';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import LiveInfoItem from '../LiveInfoItem';
import { SlotType } from '../../../types/CourseTypes';
import styles from './styles';

type LiveCellInfoModalProps = {
  visible: boolean,
  title: string,
  stepSlots: SlotType[],
  onRequestClose: () => void,
}

const formatStepSlots = (slots: SlotType[]): { startDate: string, slots: SlotType[] }[] => {
  const sortedSlots = slots.sort(ascendingSort('startDate'));
  const formattedSlots = sortedSlots.reduce(
    (acc, slot) => {
      const startDate = CompaniDate(slot.startDate).format(DD_MM_YYYY);
      if (acc[startDate]) acc[startDate].push(slot);
      else acc[startDate] = [slot];

      return acc;
    },
    {}
  );

  return Object.keys(formattedSlots).map(key => ({ startDate: key, slots: formattedSlots[key] }));
};

const LiveCellInfoModal = ({ visible, title, stepSlots, onRequestClose }: LiveCellInfoModalProps) => (
  <NiModal visible={visible}>
    <View style={styles.header}>
      <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={3}>{title}</Text>
      <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[500]}
        style={styles.closeButton} />
    </View>
    <ScrollView showsVerticalScrollIndicator={IS_WEB}>
      <FlatList ItemSeparatorComponent={() => <View style={styles.stepInfoSeparator} />} scrollEnabled={false}
        data={formatStepSlots(stepSlots)} renderItem={({ item }) => <LiveInfoItem slots={item.slots} />}
        keyExtractor={item => item.startDate} />
    </ScrollView>
  </NiModal>
);

export default LiveCellInfoModal;
