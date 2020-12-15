import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StepType } from '../../../types/StepType';
import { CourseSlotType } from '../../../types/CourseSlotType';
import moment from '../../../core/helpers/moment';
import CalendarIcon from '../../CalendarIcon';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import StepCellTitle from '../StepCellTitle';
import ActivitiesList from '../../ActivitiesList';
import OnSiteCellInfoModal from '../OnSiteCellInfoModal';
import IconButton from '../../IconButton';
import styles from './styles';

interface OnSiteCellProps {
  step: StepType,
  slots?: Array<CourseSlotType>,
  index: number,
  id: string,
  navigation: { navigate: (path: string, activityId: any) => {} },
}

const OnSiteCell = ({ step, slots = [], index, navigation, id }: OnSiteCellProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onPressChevron = () => { setIsOpen(prevState => !prevState); };

  const stepSlots = slots.filter(slot => slot.step === step._id);
  const dates = stepSlots.length
    ? stepSlots.map(stepSlot => stepSlot.endDate).sort((a, b) => moment(a).diff(b, 'days'))
    : [];
  const modalTitle = `Etape ${index + 1} - ${step.name}`;

  const closeModal = () => setIsModalVisible(false);
  const openModal = () => setIsModalVisible(true);

  return (
    <>
      <OnSiteCellInfoModal title={modalTitle} stepSlots={stepSlots} visible={isModalVisible}
        onRequestClose={closeModal} />
      <View style={[styles.container, styles.upperContainer, isOpen && styles.openedContainer]}>
        <TouchableOpacity onPress={openModal}>
          <CalendarIcon slots={dates} progress={step.progress} />
        </TouchableOpacity>
        <StepCellTitle index={index} step={step} />
        <View style={styles.iconContainer}>
          <IconButton name='info' onPress={openModal} size={ICON.LG} color={GREY[500]}
            style={styles.infoButtonContainer} />
          {!!step.activities?.length && <IconButton name={isOpen ? 'chevron-up' : 'chevron-down' }
            onPress={onPressChevron} size={ICON.MD} color={GREY[500]} style={styles.iconButtonContainer} />}
        </View>
      </View>
      { isOpen && <View style={[styles.container, styles.openedContainer]}>
        <ActivitiesList step={step} visible={isOpen} navigation={navigation} id={id} />
      </View>}
    </>
  );
};

export default OnSiteCell;
