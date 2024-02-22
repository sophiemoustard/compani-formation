import { Dispatch, useCallback, useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../../core/helpers/asyncStorage';
import NiPrimaryButton from '../../../../components/form/PrimaryButton';
import { StateType } from '../../../../types/store/StoreType';
import ActivityHistories from '../../../../api/activityHistories';
import { ActivityType, QuestionnaireAnswersType } from '../../../../types/ActivityTypes';
import CardsActions from '../../../../store/cards/actions';
import styles from '../../../../styles/endCard';
import commonStyles from '../../../../styles/common';
import { achievementJingle } from '../../../../core/helpers/utils';
import { LEARNER } from '../../../../core/data/constants';
import { CourseModeType } from '../../../../types/CourseTypes';
import { ActionType } from '../../../../context/types';
import CompaniDuration from '../../../../core/helpers/dates/companiDurations';
import { formatSecondsToISODuration } from '../../../../core/helpers/dates/utils';

interface ActivityEndCardProps {
  mode: CourseModeType,
  activity: ActivityType,
  questionnaireAnswersList: QuestionnaireAnswersType[],
  score: number,
  finalTimer: number,
  setCardIndex: (index: number | null) => void,
  goBack: () => void,
  stopTimer: () => void,
}

const ActivityEndCard = ({
  mode,
  activity,
  questionnaireAnswersList,
  score,
  finalTimer,
  setCardIndex,
  goBack,
  stopTimer,
}: ActivityEndCardProps) => {
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
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

const mapStateToProps = (state: StateType) => ({
  questionnaireAnswersList: state.cards.questionnaireAnswersList,
  score: state.cards.score,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setCardIndex: (index: number | null) => dispatch(CardsActions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityEndCard);
