import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import IconButton from '../../IconButton';
import Actions from '../../../store/activities/actions';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import { ActionType } from '../../../types/store/StoreType';
import styles from './style';

interface CardHeaderProps {
  color?: string,
  icon?: string,
  onPress?: () => void,
  setExitConfirmationModal: (boolean) => void,
}

const CardHeader = ({ color = GREY[600], icon = 'x-circle', setExitConfirmationModal, onPress }: CardHeaderProps) => {
  const iconButtonOnPress = onPress || (() => setExitConfirmationModal(true));
  return (
    <View style={styles.container}>
      <IconButton name={icon} onPress={iconButtonOnPress} size={ICON.LG} color={color}
        style={styles.closeButton} />
    </View>
  );
};

const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setExitConfirmationModal: openModal => dispatch(Actions.setExitConfirmationModal(openModal)),
});

export default connect(null, mapDispatchToProps)(CardHeader);
