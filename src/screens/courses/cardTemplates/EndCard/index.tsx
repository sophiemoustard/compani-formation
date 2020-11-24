import React, { useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../../../components/form/Button';
import { navigate } from '../../../../navigationRef';
import { StateType } from '../../../../types/store/StoreType';
import ActivityHistories from '../../../../api/activityHistories';
import { ActivityType } from '../../../../types/ActivityType';
import Actions from '../../../../store/activities/actions';
import { QuestionnaireAnswerType } from '../../../../types/store/ActivityStoreType';
import styles from './styles';

interface EndCardProps {
  courseId: String,
  isCourse: boolean,
  activity: ActivityType,
  questionnaireAnswersList: Array<QuestionnaireAnswerType>,
  score: number,
  resetActivityReducer: () => void,
  setCardIndex: (number) => void,
}

const EndCard = ({
  courseId,
  isCourse,
  activity,
  questionnaireAnswersList,
  score,
  setCardIndex,
  resetActivityReducer,
}: EndCardProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      const userId = await AsyncStorage.getItem('user_id');
      const payload: Record<string, any> = { user: userId, activity: activity._id, score };

      if (questionnaireAnswersList?.length) payload.questionnaireAnswersList = questionnaireAnswersList;
      await ActivityHistories.createActivityHistories(payload);
      setCardIndex(null);
    }

    if (isFocused && isCourse) fetchData();
  }, [isFocused, activity, questionnaireAnswersList, setCardIndex, score, isCourse]);

  const goBack = () => {
    if (isCourse) navigate('CourseProfile', { courseId });
    else navigate('SubProgramProfile', { subProgramId: courseId });
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
