import React, { useEffect, ComponentType } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import asyncStorage from '../../../../core/helpers/asyncStorage';
import Button from '../../../../components/form/Button';
import { StateType } from '../../../../types/store/StoreType';
import ActivityHistories from '../../../../api/activityHistories';
import { ActivityType } from '../../../../types/ActivityType';
import Actions from '../../../../store/activities/actions';
import { QuestionnaireAnswerType } from '../../../../types/store/ActivityStoreType';
import styles from './styles';
import { achievementJingle } from '../../../../core/helpers/utils';

interface EndCardProps {
  profileId: String,
  isCourse: boolean,
  activity: ActivityType,
  questionnaireAnswersList: Array<QuestionnaireAnswerType>,
  score: number,
  resetActivityReducer: () => void,
  setCardIndex: (number) => void,
}

const EndCard: ComponentType<any> = ({
  profileId,
  isCourse,
  activity,
  questionnaireAnswersList,
  score,
  setCardIndex,
  resetActivityReducer,
}: EndCardProps) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

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

  const goBack = () => {
    if (isCourse) navigation.navigate('CourseProfile', { courseId: profileId, endedActivity: activity._id });
    else navigation.navigate('SubProgramProfile', { subProgramId: profileId });
    resetActivityReducer();
  };

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
  questionnaireAnswersList: state.activities.questionnaireAnswersList,
  score: state.activities.score,
  isCourse: state.courses.isCourse,
});

const mapDispatchToProps = dispatch => ({
  setCardIndex: index => dispatch(Actions.setCardIndex(index)),
  resetActivityReducer: () => dispatch(Actions.resetActivityReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EndCard);
