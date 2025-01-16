import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { formatIdentity } from '../../core/helpers/utils';
import { TrainerType } from '../../types/CourseTypes';
import { LONG_FIRSTNAME_LONG_LASTNAME } from '../../core/data/constants';
import commonStyles from '../../styles/common';
import styles from './style';

interface TrainerCellProps {
  trainer: TrainerType,
}

const TrainerCell = ({ trainer }: TrainerCellProps) => {
  const [trainerPictureSource, setTrainerPictureSource] = useState(
    require('../../../assets/images/default_avatar.webp')
  );

  useEffect(() => {
    if (trainer?.picture?.link) setTrainerPictureSource({ uri: trainer.picture.link });
  }, [trainer?.picture?.link]);

  return (
    <>
      <View style={styles.subSectionContainer}>
        <Image style={styles.trainerPicture} source={trainerPictureSource} />
        <Text style={styles.subSectionTitle}>
          {formatIdentity(trainer.identity, LONG_FIRSTNAME_LONG_LASTNAME)}
        </Text>
      </View>
      {!!trainer.biography && <Text style={commonStyles.sectionContent}>{trainer.biography}</Text>}
    </>
  );
};

export default TrainerCell;
