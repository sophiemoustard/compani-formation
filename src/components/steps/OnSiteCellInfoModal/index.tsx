import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { CourseSlotType } from '../../../types/CourseSlotType';
import moment from '../../../core/helpers/moment';
import NiModal from '../../Modal';
import FeatherButton from '../../icons/FeatherButton';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import OnSiteInfoItem from '../OnSiteInfoItem';
import styles from './styles';

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

  return (
    <NiModal visible={visible}>
      <View style={styles.header}>
        <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={3}>{title}</Text>
        <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[500]}
          style={styles.closeButton} />
      </View>
      <FlatList ItemSeparatorComponent={() => <View style={styles.stepInfoSeparator} />} scrollEnabled={true}
        data={formatStepSlotsForFlatList(stepSlots)} renderItem={({ item }) => <OnSiteInfoItem info={item} />}
        keyExtractor={item => item.startDate} />
    </NiModal>
  );
};

export default OnSiteCellInfoModal;
