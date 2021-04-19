import React, { useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../../core/helpers/asyncStorage';
import Button from '../../../../components/form/Button';
import { QuestionnaireType } from '../../../../types/QuestionnaireType';
import CardsActions from '../../../../store/cards/actions';
import styles from '../../../../styles/endCard';
import { achievementJingle } from '../../../../core/helpers/utils';
import { QuestionnaireAnswerType } from '../../../../types/store/CardStoreType';
import { StateType } from '../../../../types/store/StoreType';
import QuestionnaireHistories from '../../../../api/questionnaireHistories';

interface QuestionnaireEndCardProps {
  courseId: string
  questionnaire: QuestionnaireType,
  questionnaireAnswersList: Array<QuestionnaireAnswerType>,
  goBack: () => void,
  setCardIndex: (number) => void,
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
    async function fetchData() {
      const userId = await asyncStorage.getUserId();
      const payload: Record<string, any> = { course: courseId, user: userId, questionnaire: questionnaire._id };

      if (questionnaireAnswersList?.length) payload.questionnaireAnswersList = questionnaireAnswersList;
      await QuestionnaireHistories.createQuestionnaireHistories(payload);
      setCardIndex(null);
    }

    if (isFocused) {
      fetchData();
      achievementJingle();
    }
  }, [courseId, isFocused, questionnaire, questionnaireAnswersList, setCardIndex]);

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

const mapStateToProps = (state: StateType) => ({
  questionnaireAnswersList: state.cards.questionnaireAnswersList,
});

const mapDispatchToProps = dispatch => ({
  setCardIndex: index => dispatch(CardsActions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireEndCard);
