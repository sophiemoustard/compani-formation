// @ts-nocheck
import { Dispatch, useCallback, useContext } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect, useRouter } from 'expo-router';
import asyncStorage from '@/core/helpers/asyncStorage';
import NiPrimaryButton from '@/components/form/PrimaryButton';
import CardsActions from '@/store/cards/actions';
import styles from '@/styles/endCard';
import { achievementJingle } from '@/core/helpers/utils';
import { QuestionnaireAnswersType } from '@/types/ActivityTypes';
import { StateType } from '@/types/store/StoreType';
import QuestionnaireHistories from '@/api/questionnaireHistories';
import { ActionType } from '@/context/types';
import { Context as CardContext } from '@/context/CardContext';

interface QuestionnaireEndCardProps {
  exitConfirmationModal: boolean,
  setExitConfirmationModal: (boolean: boolean) => void,
  questionnaireAnswersList: QuestionnaireAnswersType[],
  resetCardReducer: () => void,
}

const QuestionnaireEndCard = ({
  exitConfirmationModal,
  setExitConfirmationModal,
  questionnaireAnswersList,
  resetCardReducer,
}: QuestionnaireEndCardProps) => {
  const router = useRouter();
  const { questionnaire, profileId: courseId, setIsActive } = useContext(CardContext);

  useFocusEffect(
    useCallback(() => {
      async function createQuestionnaireHistories() {
        const userId = await asyncStorage.getUserId();
        if (!courseId || !userId || !questionnaire._id) return;

        const payload = {
          course: courseId,
          user: userId,
          questionnaire: questionnaire._id,
          ...(questionnaireAnswersList?.length && { questionnaireAnswersList }),
        };

        await QuestionnaireHistories.createQuestionnaireHistories(payload);
      }
      createQuestionnaireHistories();
      achievementJingle();
    }, [courseId, questionnaire._id, questionnaireAnswersList])
  );

  const goBack = async () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);

    router.navigate({ pathname: '/Courses/LearnerCourseProfile', params: { courseId } });

    setIsActive(false);
    resetCardReducer();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ImageBackground style={styles.elipse}
        source={require('../../../../../../assets/images/end_card_background.webp')}>
        <Text style={styles.text}>Questionnaire terminé</Text>
        <Image source={require('../../../../../../assets/images/aux_fierte.webp')} style={styles.image} />
      </ImageBackground>
      <NiPrimaryButton customStyle={styles.button} caption="Terminer" onPress={goBack} />
    </ScrollView>
  );
};

const mapStateToProps = (state: StateType) => ({
  questionnaireAnswersList: state.cards.questionnaireAnswersList,
  exitConfirmationModal: state.cards.exitConfirmationModal,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setCardIndex: (index: number | null) => dispatch(CardsActions.setCardIndex(index)),
  setExitConfirmationModal: (openModal: boolean) => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEndCard);
