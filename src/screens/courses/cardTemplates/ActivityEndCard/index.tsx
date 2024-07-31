import { useCallback, useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../../core/helpers/asyncStorage';
import NiPrimaryButton from '../../../../components/form/PrimaryButton';
import ActivityHistories from '../../../../api/activityHistories';
import { ActivityType, QuestionnaireAnswersType } from '../../../../types/ActivityTypes';
import styles from '../../../../styles/endCard';
import commonStyles from '../../../../styles/common';
import { achievementJingle } from '../../../../core/helpers/utils';
import { LEARNER } from '../../../../core/data/constants';
import { CourseModeType } from '../../../../types/CourseTypes';
import CompaniDuration from '../../../../core/helpers/dates/companiDurations';
import { formatSecondsToISODuration } from '../../../../core/helpers/dates/utils';
import { useGetQuestionnaireAnswersList, useGetScore, useSetCardIndex } from '../../../../store/cards/hooks';

interface ActivityEndCardProps {
  mode: CourseModeType,
  activity: ActivityType,
  finalTimer: number,
  goBack: () => void,
  stopTimer: () => void,
}

const ActivityEndCard = ({ mode, activity, finalTimer, goBack, stopTimer }: ActivityEndCardProps) => {
  const questionnaireAnswersList = useGetQuestionnaireAnswersList();
  const score = useGetScore();
  const setCardIndex = useSetCardIndex();
  const isFocused = useIsFocused();

  const saveHistory = useCallback(
    async (finalScore: number, finalQuestionnaireAnswersList: QuestionnaireAnswersType[], numberDuration: number) => {
      const userId = await asyncStorage.getUserId();

      if (!userId || !activity._id) return;

      const payload = {
        activity: activity._id,
        user: userId,
        score: finalScore,
        duration: CompaniDuration(formatSecondsToISODuration(numberDuration)).toISO(),
        ...(finalQuestionnaireAnswersList?.length && { questionnaireAnswersList: finalQuestionnaireAnswersList }),
      };

      await ActivityHistories.createActivityHistories(payload);
    },
    [activity._id]
  );

  useEffect(() => {
    if (isFocused) {
      stopTimer();
      setCardIndex(null);
      achievementJingle();
    }
  }, [isFocused, setCardIndex, mode, stopTimer, saveHistory]);

  useEffect(() => {
    if (finalTimer && mode === LEARNER) saveHistory(score, questionnaireAnswersList, finalTimer);
  }, [finalTimer, mode, questionnaireAnswersList, saveHistory, score]);

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <ImageBackground style={styles.elipse}
          source={require('../../../../../assets/images/end_card_background.webp')}>
          <Text style={styles.text}>Activité terminée</Text>
          <Image source={require('../../../../../assets/images/aux_fierte.webp')} style={styles.image} />
        </ImageBackground>
        <NiPrimaryButton customStyle={styles.button} caption="Terminer" onPress={goBack} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityEndCard;
