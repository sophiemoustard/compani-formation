import { useEffect, useState } from 'react';
import { View } from 'react-native';
import FeatherButton from '../../icons/FeatherButton';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import styles from './styles';
import commonStyle from '../../../styles/common';
import ProgressBar from '../ProgressBar';
import { FeatherType } from '../../../types/FeatherType';
import {
  useDisplayProgressBar,
  useGetMaxProgress,
  useGetProgress,
  useSetExitConfirmationModal,
} from '../../../store/cards/hooks';

interface CardHeaderProps {
  color?: string,
  icon?: FeatherType,
  onPress?: () => void,
}

const CardHeader = ({ color = GREY[600], icon = 'x-circle', onPress }: CardHeaderProps) => {
  const displayProgressBar = useDisplayProgressBar();
  const maxProgress = useGetMaxProgress();
  const progress = useGetProgress();
  const setExitConfirmationModal = useSetExitConfirmationModal();
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

export default CardHeader;
