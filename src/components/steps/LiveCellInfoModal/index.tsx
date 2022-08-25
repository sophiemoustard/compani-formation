import { View, Text, FlatList } from 'react-native';
import companiDate from '../../../core/helpers/dates/companiDates';
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

const formatStepSlots = (slots): { startDate: string, slots: SlotType[] }[] => {
  const sortedSlots = slots.sort((a, b) => companiDate(a.startDate).diff(b.startDate, 'minutes'));
  const formattedSlots = sortedSlots.reduce((acc, slot) => {
    const startDate = companiDate(slot.startDate).format('yyyy-LL-dd');
    if (acc[startDate]) acc[startDate].push(slot);
    else acc[startDate] = [slot];

    return acc;
  },
  {});

  return Object.keys(formattedSlots).map(key => ({ startDate: key, slots: formattedSlots[key] }));
};

const LiveCellInfoModal = ({ visible, title, stepSlots, onRequestClose }: LiveCellInfoModalProps) => (
  <NiModal visible={visible}>
    <View style={styles.header}>
      <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={3}>{title}</Text>
      <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[500]}
        style={styles.closeButton} />
    </View>
    <FlatList ItemSeparatorComponent={() => <View style={styles.stepInfoSeparator} />} scrollEnabled={true}
      data={formatStepSlots(stepSlots)} renderItem={({ item }) => <LiveInfoItem slots={item.slots} />}
      keyExtractor={item => item.startDate} />
  </NiModal>
);

export default LiveCellInfoModal;
