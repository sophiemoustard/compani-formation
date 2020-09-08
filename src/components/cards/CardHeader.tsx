import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import IconButton from '../IconButton';
import { setExitConfirmationModal } from '../../store/actions';
import { ICON, MARGIN } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import { SetExitConfirmationModalType } from '../../types/StoreType';

interface CardHeaderProps {
  color?: string,
  icon?: string,
  dispatch: ({ type, payload }: SetExitConfirmationModalType) => void,
}

const CardHeader = ({ color = GREY['700'], icon = 'x-circle', dispatch }: CardHeaderProps) => {
  const onPress = () => dispatch(setExitConfirmationModal(true));
  return (
    <View style={styles.container}>
      <IconButton name={icon} onPress={onPress} size={ICON.LG} color={color} style={styles.closeButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: MARGIN.XL,
    marginTop: MARGIN.MD,
    marginLeft: MARGIN.MD,
  },
  closeButton: {
    width: ICON.LG,
    justifyContent: 'center',
    alignItems: 'center',
    left: -1,
  },
});

export default connect()(CardHeader);
