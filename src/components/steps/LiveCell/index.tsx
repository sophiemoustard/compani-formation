import { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SlotType } from '../../../types/CourseTypes';
import { LiveStepType } from '../../../types/StepTypes';
import companiDate from '../../../core/helpers/dates';
import CalendarIcon from '../../CalendarIcon';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import StepCellTitle from '../StepCellTitle';
import ActivityList from '../../activities/ActivityList';
import LiveCellInfoModal from '../LiveCellInfoModal';
import FeatherButton from '../../icons/FeatherButton';
import styles from './styles';

type LiveCellProps = {
  step: LiveStepType,
  slots?: SlotType[],
  index: number,
  profileId: string,
}

const LiveCell = ({ step, slots = [], index, profileId }: LiveCellProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [stepSlots, setStepSlots] = useState<SlotType[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [modalTitle, setModalTitle] = useState('');

  const onPressChevron = () => { setIsOpen(prevState => !prevState); };

  useEffect(() => { setModalTitle(`Etape ${index + 1} - ${step.name}`); }, [step, index]);

  useEffect(() => {
    setStepSlots(slots.filter(slot => slot.step._id === step._id));
  }, [slots, step]);

  useEffect(() => {
    if (!stepSlots.length) setDates([]);
    else setDates(stepSlots.map(stepSlot => stepSlot.endDate).sort((a, b) => companiDate(a).diff(b, 'days')));
  }, [stepSlots]);

  const closeModal = () => setIsModalVisible(false);
  const openModal = () => setIsModalVisible(true);

  return (
    <>
      <LiveCellInfoModal title={modalTitle} stepSlots={stepSlots} visible={isModalVisible}
        onRequestClose={closeModal} />
      <TouchableOpacity style={[styles.container, styles.upperContainer, isOpen && styles.openedContainer]}
        onPress={onPressChevron} disabled={!step.activities?.length}>
        <TouchableOpacity onPress={openModal}>
          <CalendarIcon slots={dates} progress={step.progress.live} />
        </TouchableOpacity>
        <StepCellTitle index={index} name={step.name} type={step.type} />
        <View style={styles.iconContainer}>
          <FeatherButton name='info' onPress={openModal} size={ICON.LG} color={GREY[500]}
            style={styles.infoButtonContainer} />
          {!!step.activities?.length && <FeatherButton name={isOpen ? 'chevron-up' : 'chevron-down' }
            onPress={onPressChevron} size={ICON.MD} color={GREY[500]} style={styles.iconButtonContainer} />}
        </View>
      </TouchableOpacity>
      {isOpen && <View style={[styles.container, styles.openedContainer]}>
        <ActivityList activities={step.activities} profileId={profileId} />
      </View>}
    </>
  );
};

export default LiveCell;
