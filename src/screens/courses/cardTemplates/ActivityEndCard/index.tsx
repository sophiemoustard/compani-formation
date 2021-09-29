import React, { useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../../core/helpers/asyncStorage';
import NiPrimaryButton from '../../../../components/form/PrimaryButton';
import { StateType } from '../../../../types/store/StoreType';
import ActivityHistories from '../../../../api/activityHistories';
import { ActivityType, QuestionnaireAnswersType } from '../../../../types/ActivityTypes';
import CardsActions from '../../../../store/cards/actions';
import styles from '../../../../styles/endCard';
import { achievementJingle } from '../../../../core/helpers/utils';

interface ActivityEndCardProps {
  isCourse: boolean,
  activity: ActivityType,
  questionnaireAnswersList: QuestionnaireAnswersType[],
  score: number,
  setCardIndex: (index: number | null) => void,
  goBack: () => void,
}

const ActivityEndCard = ({
  isCourse,
  activity,
  questionnaireAnswersList,
  score,
  setCardIndex,
  goBack,
}: ActivityEndCardProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      const userId = await asyncStorage.getUserId();
      const payload = questionnaireAnswersList?.length
        ? { user: userId, activity: activity._id, score, questionnaireAnswersList }
        : { user: userId, activity: activity._id, score };

      await ActivityHistories.createActivityHistories(payload);
      setCardIndex(null);
    }

    if (isFocused) {
      if (isCourse) fetchData();
      achievementJingle();
    }
  }, [isFocused, activity, questionnaireAnswersList, setCardIndex, score, isCourse]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ImageBackground style={styles.elipse} source={require('../../../../../assets/images/end_card_background.png')}>
        <Text style={styles.text}>Activité terminée</Text>
        <Image source={require('../../../../../assets/images/aux_fierte.png')} style={styles.image} />
      </ImageBackground>
      <NiPrimaryButton customStyle={styles.button} caption="Terminer" onPress={goBack} />
    </ScrollView>
  );
};

const mapStateToProps = (state: StateType) => ({
  questionnaireAnswersList: state.cards.questionnaireAnswersList,
  score: state.cards.score,
  isCourse: state.courses.isCourse,
});

const mapDispatchToProps = dispatch => ({
  setCardIndex: index => dispatch(CardsActions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityEndCard);
