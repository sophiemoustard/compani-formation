import { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import get from 'lodash/get';
import { CourseModeType, SlotType } from '../../../types/CourseTypes';
import { LiveStepType } from '../../../types/StepTypes';
import { ascendingSort } from '../../../core/helpers/dates/utils';
import CalendarIcon from '../../CalendarIcon';
import { ICON } from '../../../styles/metrics';
import { GREY, PINK, PURPLE } from '../../../styles/colors';
import StepCellTitle from '../StepCellTitle';
import LiveCellInfoModal from '../LiveCellInfoModal';
import styles from './styles';
import { TRAINER } from '../../../core/data/constants';

type LiveCellProps = {
  step: LiveStepType,
  slots?: SlotType[],
  index: number,
  mode: CourseModeType,
}

const LiveCell = ({ step, slots = [], index, mode }: LiveCellProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stepSlots, setStepSlots] = useState<SlotType[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => { setModalTitle(`Etape ${index + 1} - ${step.name}`); }, [step, index]);

  useEffect(() => {
    setStepSlots(slots.filter(slot => slot.step._id === step._id));
  }, [slots, step]);

  useEffect(() => {
    if (!stepSlots.length) setDates([]);
    else setDates(stepSlots.sort(ascendingSort('endDate')).map(stepSlot => stepSlot.endDate));
  }, [stepSlots]);

  const closeModal = () => setIsModalVisible(false);
  const openModal = () => setIsModalVisible(true);

  return (
    <>
      <LiveCellInfoModal title={modalTitle} stepSlots={stepSlots} visible={isModalVisible}
        onRequestClose={closeModal} />
      <TouchableOpacity style={[styles.container, styles.upperContainer]} onPress={openModal}>
        <CalendarIcon slots={dates} progress={get(step, 'progress.live')}
          color={mode === TRAINER ? PURPLE[800] : PINK[500]}/>
        <StepCellTitle index={index} name={step.name} type={step.type} showMisc={mode === TRAINER} />
        <View style={styles.iconContainer}>
          <Feather name='info' size={ICON.LG} color={GREY[500]} style={styles.infoButtonContainer} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default LiveCell;
