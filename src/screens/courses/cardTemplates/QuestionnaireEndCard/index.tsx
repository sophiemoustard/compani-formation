import React, { useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Button from '../../../../components/form/Button';
import { QuestionnaireType } from '../../../../types/QuestionnaireType';
import styles from '../../../../styles/endCard';
import { achievementJingle } from '../../../../core/helpers/utils';

interface QuestionnaireEndCardProps {
  questionnaire: QuestionnaireType,
  goBack: () => void,
}

const QuestionnaireEndCard = ({ goBack }: QuestionnaireEndCardProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) achievementJingle();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ImageBackground style={styles.elipse} source={require('../../../../../assets/images/end_card_background.png')}>
        <Text style={styles.text}>Questionnaire terminé</Text>
        <Image source={require('../../../../../assets/images/aux_fierte.png')} style={styles.image} />
      </ImageBackground>
      <Button style={styles.button} caption="Terminer" onPress={goBack} />
    </ScrollView>
  );
};

export default QuestionnaireEndCard;
