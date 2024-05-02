// @ts-nocheck
import { Dispatch, useCallback, useContext, useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import asyncStorage from '@/core/helpers/asyncStorage';
import NiPrimaryButton from '@/components/form/PrimaryButton';
import { StateType } from '@/types/store/StoreType';
import ActivityHistories from '@/api/activityHistories';
import { QuestionnaireAnswersType } from '@/types/ActivityTypes';
import CardsActions from '@/store/cards/actions';
import styles from '@/styles/endCard';
import commonStyles from '@/styles/common';
import { achievementJingle } from '@/core/helpers/utils';
import { LEARNER } from '@/core/data/constants';
import { ActionType } from '@/context/types';
import CompaniDuration from '@/core/helpers/dates/companiDurations';
import { formatSecondsToISODuration } from '@/core/helpers/dates/utils';
import { Context as CardContext } from '@/context/CardContext';

interface ActivityEndCardProps {
  exitConfirmationModal,
  setExitConfirmationModal: (boolean: boolean) => void,
  resetCardReducer: () => void,
  resetCardReducer: () => void,
  questionnaireAnswersList: QuestionnaireAnswersType[],
  score: number,
  setCardIndex: (index: number | null) => void,
}

const ActivityEndCard = ({
  exitConfirmationModal,
  setExitConfirmationModal,
  resetCardReducer,
  questionnaireAnswersList,
  score,
  setCardIndex,
}: ActivityEndCardProps) => {
  const {
    activity,
    stopTimer,
    mode,
    finalTimer,
    navigateNext,
    setIsActive,
  } = useContext(CardContext);

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

  const goBack = useCallback(
    async () => {
      if (exitConfirmationModal) setExitConfirmationModal(false);

      stopTimer();
      navigateNext();
      setIsActive(false);
      resetCardReducer();
    },
    [exitConfirmationModal, navigateNext, resetCardReducer, setExitConfirmationModal, setIsActive, stopTimer]
  );

  useFocusEffect(
    useCallback(() => {
      stopTimer();
      setCardIndex(null);
      achievementJingle();
    }, [setCardIndex, stopTimer])
  );

  useEffect(() => {
    if (finalTimer && mode === LEARNER) saveHistory(score, questionnaireAnswersList, finalTimer);
  }, [finalTimer, mode, questionnaireAnswersList, saveHistory, score]);

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ImageBackground style={styles.elipse}
          source={require('../../../../../../assets/images/end_card_background.webp')}>
          <Text style={styles.text}>Activité terminée</Text>
          <Image source={require('../../../../../../assets/images/aux_fierte.webp')} style={styles.image} />
        </ImageBackground>
        <NiPrimaryButton customStyle={styles.button} caption="Terminer" onPress={goBack} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({
  questionnaireAnswersList: state.cards.questionnaireAnswersList,
  score: state.cards.score,
  exitConfirmationModal: state.cards.exitConfirmationModal,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setCardIndex: (index: number | null) => dispatch(CardsActions.setCardIndex(index)),
  setExitConfirmationModal: (openModal: boolean) => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityEndCard);
