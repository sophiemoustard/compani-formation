import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import IconButton from '../../IconButton';
import Actions from '../../../store/activities/actions';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import { ActionType } from '../../../types/store/StoreType';
import styles from './style';
import { getCard } from '../../../store/activities/selectors';
import ProgressBar from '../ProgressBar';
import { TRANSITION } from '../../../core/data/constants';
import { StateType } from '../../../context/AuthContext';

interface CardHeaderProps {
  color?: string,
  icon?: string,
  displayProgressBar: boolean,
  onPress?: () => void,
  setExitConfirmationModal: (boolean) => void,
}

const CardHeader = ({ color = GREY[600], icon = 'x-circle', displayProgressBar,
  setExitConfirmationModal, onPress }: CardHeaderProps) => {
  const iconButtonOnPress = onPress || (() => setExitConfirmationModal(true));

  return (
    <View style={styles.container}>
      <IconButton name={icon} onPress={iconButtonOnPress} size={ICON.LG} color={color}
        style={styles.closeButton} />
      {displayProgressBar && <ProgressBar />}
    </View>
  );
};

const mapStateToProps = (state: StateType) => (
  { displayProgressBar: getCard(state) !== undefined && getCard(state)?.template !== TRANSITION }
);

const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setExitConfirmationModal: openModal => dispatch(Actions.setExitConfirmationModal(openModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardHeader);
