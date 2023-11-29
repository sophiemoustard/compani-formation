import { Dispatch, useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../../core/helpers/asyncStorage';
import NiPrimaryButton from '../../../../components/form/PrimaryButton';
import { QuestionnaireType } from '../../../../types/QuestionnaireType';
import CardsActions from '../../../../store/cards/actions';
import styles from '../../../../styles/endCard';
import { achievementJingle } from '../../../../core/helpers/utils';
import { QuestionnaireAnswersType } from '../../../../types/ActivityTypes';
import { StateType } from '../../../../types/store/StoreType';
import QuestionnaireHistories from '../../../../api/questionnaireHistories';
import { ActionType } from '../../../../context/types';

interface QuestionnaireEndCardProps {
  courseId: string
  questionnaire: QuestionnaireType,
  questionnaireAnswersList: QuestionnaireAnswersType[],
  goBack: () => void,
  setCardIndex: (index: number | null) => void,
}

const QuestionnaireEndCard = ({
  courseId,
  questionnaire,
  questionnaireAnswersList,
  goBack,
  setCardIndex,
}: QuestionnaireEndCardProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
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

    if (isFocused) {
      createQuestionnaireHistories();
      achievementJingle();
    }
  }, [courseId, isFocused, questionnaire, questionnaireAnswersList, setCardIndex]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ImageBackground style={styles.elipse} source={require('../../../../../assets/images/end_card_background.webp')}>
        <Text style={styles.text}>Questionnaire terminé</Text>
        <Image source={require('../../../../../assets/images/aux_fierte.webp')} style={styles.image} />
      </ImageBackground>
      <NiPrimaryButton customStyle={styles.button} caption="Terminer" onPress={goBack} />
    </ScrollView>
  );
};

const mapStateToProps = (state: StateType) => ({
  questionnaireAnswersList: state.cards.questionnaireAnswersList,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setCardIndex: (index: number | null) => dispatch(CardsActions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEndCard);
