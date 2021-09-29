import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import FeatherButton from '../../icons/FeatherButton';
import Actions from '../../../store/cards/actions';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import { ActionType, StateType } from '../../../types/store/StoreType';
import styles from './styles';
import commonStyle from '../../../styles/common';
import ProgressBar from '../ProgressBar';
import Selectors from '../../../store/cards/selectors';
import { FeatherType } from '../../../types/FeatherType';

interface CardHeaderProps {
  color?: string,
  icon?: FeatherType,
  displayProgressBar: boolean,
  maxProgress: number,
  progress: number,
  onPress?: () => void,
  setExitConfirmationModal: (boolean) => void,
}

const CardHeader = ({
  color = GREY[600],
  icon = 'x-circle',
  displayProgressBar,
  maxProgress,
  progress,
  setExitConfirmationModal,
  onPress,
}: CardHeaderProps) => {
  const iconButtonOnPress = onPress || (() => setExitConfirmationModal(true));
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  useEffect(() => {
    setProgressPercentage(maxProgress ? (progress / maxProgress) * 100 : 0);
  }, [progress, maxProgress]);

  return (
    <View style={styles.container}>
      <FeatherButton name={icon} onPress={iconButtonOnPress} size={ICON.LG} color={color} style={styles.closeButton} />
      {displayProgressBar && <View style={commonStyle.progressBarContainer}>
        <ProgressBar progress={progressPercentage} />
      </View>}
    </View>
  );
};

const mapStateToProps = (state: StateType) => ({
  displayProgressBar: Selectors.displayProgressBar(state),
  maxProgress: Selectors.getMaxProgress(state),
  progress: Selectors.getProgress(state),
}
);

const mapDispatchToProps = (dispatch: ({ type, payload }: ActionType) => void) => ({
  setExitConfirmationModal: openModal => dispatch(Actions.setExitConfirmationModal(openModal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardHeader);
