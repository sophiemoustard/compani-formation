import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import IconButton from '../../IconButton';
import Actions from '../../../store/activities/actions';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import { ActionType, StateType } from '../../../types/store/StoreType';
import styles from './style';
import { displayProgressBar } from '../../../store/activities/selectors';
import ProgressBar from '../ProgressBar';

interface CardHeaderProps {
  color?: string,
  icon?: string,
  isDisplayedProgressBar: boolean,
  onPress?: () => void,
  setExitConfirmationModal: (boolean) => void,
}

const CardHeader = ({
  color = GREY[600],
  icon = 'x-circle',
  isDisplayedProgressBar,
  setExitConfirmationModal,
  onPress,
}: CardHeaderProps) => {
  const iconButtonOnPress = onPress || (() => setExitConfirmationModal(true));

  return (
    <View style={styles.container}>
      <IconButton name={icon} onPress={iconButtonOnPress} size={ICON.LG} color={color}
        style={styles.closeButton} />
      {isDisplayedProgressBar && <ProgressBar />}
    </View>
  );
};

const mapStateToProps = (state: StateType) => (
  { isDisplayedProgressBar: displayProgressBar(state) }
);

const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setExitConfirmationModal: openModal => dispatch(Actions.setExitConfirmationModal(openModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardHeader);
