import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import moment from '../../../core/helpers/moment';
import CalendarIcon from '../CalendarIcon';
import { MARGIN, PADDING, BORDER_WIDTH, ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import StepCellTitle from './StepCellTitle';
import OnSiteCellInfoModal from './modal/OnSiteCellInfoModal';
import IconButton from '../IconButton';

const OnSiteCell = ({ step, slots, index }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const stepSlots = slots.filter(slot => slot.step === step._id);
  const dates = stepSlots.length
    ? stepSlots.map(stepSlot => stepSlot.startDate).sort((a, b) => moment(a).diff(b, 'days'))
    : [];

  const closeModal = () => {
    setIsModalVisible(prevState => !prevState);
  };

  return (
    <View>
      <OnSiteCellInfoModal
        title={step.name}
        stepSlots={stepSlots}
        visible={isModalVisible}
        onRequestClose={closeModal}
      />
      <View style={styles.container}>
        <CalendarIcon dates={dates} />
        <StepCellTitle index={index} step={step} />
        <IconButton name='info' onPress={() => { setIsModalVisible(true); }} size={ICON.LG}
          color={GREY[500]} style={styles.infoButtonContainer} />
      </View>
    </View>
  );
};

OnSiteCell.propTypes = {
  step: PropTypes.object,
  slots: PropTypes.array,
  index: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: GREY[100],
    flexDirection: 'row',
    padding: PADDING.LG,
    borderWidth: BORDER_WIDTH,
    borderColor: GREY[200],
  },
  infoButtonContainer: {
    width: 40,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default OnSiteCell;
