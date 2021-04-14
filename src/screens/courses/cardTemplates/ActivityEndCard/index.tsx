import React, { useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../../core/helpers/asyncStorage';
import Button from '../../../../components/form/Button';
import { StateType } from '../../../../types/store/StoreType';
import ActivityHistories from '../../../../api/activityHistories';
import { ActivityType } from '../../../../types/ActivityType';
import CardsActions from '../../../../store/cards/actions';
import { QuestionnaireAnswerType } from '../../../../types/store/CardStoreType';
import styles from './styles';
import { achievementJingle } from '../../../../core/helpers/utils';

interface ActivityEndCardProps {
  isCourse: boolean,
  activity: ActivityType,
  questionnaireAnswersList: Array<QuestionnaireAnswerType>,
  score: number,
  setCardIndex: (number) => void,
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
      const payload: Record<string, any> = { user: userId, activity: activity._id, score };

      if (questionnaireAnswersList?.length) payload.questionnaireAnswersList = questionnaireAnswersList;
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
      <Button style={styles.button} caption="Terminer" onPress={goBack} />
    </ScrollView>
  );
};

const mapStateToProps = (state: StateType) => ({
  activity: state.activities.activity,
  questionnaireAnswersList: state.cards.questionnaireAnswersList,
  score: state.cards.score,
  isCourse: state.courses.isCourse,
});

const mapDispatchToProps = dispatch => ({
  setCardIndex: index => dispatch(CardsActions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityEndCard);
