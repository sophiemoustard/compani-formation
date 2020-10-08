import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { CourseSlotType } from '../../types/CourseSlotType';
import moment from '../../core/helpers/moment';
import NiModal from '../Modal';
import IconButton from '../IconButton';
import { BORDER_WIDTH, MARGIN, ICON } from '../../styles/metrics';
import { GREY, PINK } from '../../styles/colors';
import OnSiteInfoItem from './OnSiteInfoItem';
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

  return (
    <NiModal visible={visible}>
      <View style={styles.header}>
        <Text style={styles.title} lineBreakMode={'tail'} numberOfLines={3}>{title}</Text>
        <IconButton name='x-circle' onPress={onRequestClose} size={ICON.LG}
          color={GREY[500]} style={styles.closeButton}/>
      </View>
      <FlatList ItemSeparatorComponent={() => <View style={styles.stepInfoSeparator} />} scrollEnabled={true}
        data={formatStepSlotsForFlatList(stepSlots)} renderItem={({ item }) => <OnSiteInfoItem info={item} />}
        keyExtractor={item => item.startDate} />
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
