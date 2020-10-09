import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../../components/form/Button';
import { navigate } from '../../../navigationRef';
import { YELLOW, GREY } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import { FIRA_SANS_BLACK } from '../../../styles/fonts';
import { StateType } from '../../../types/store/StoreType';
import ActivityHistories from '../../../api/activityHistories';
import { ActivityType } from '../../../types/ActivityType';
import Actions from '../../../store/activities/actions';
import { QuestionnaireAnswerType } from '../../../types/store/ActivityStoreType';

interface EndCardProps {
  courseId: String,
  activity: ActivityType,
  questionnaireAnswersList: Array<QuestionnaireAnswerType>,
  score: number,
  resetActivityReducer: () => void,
  setCardIndex: (number) => void,
}

const EndCard = ({
  courseId,
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

    if (isFocused) fetchData();
  }, [isFocused, activity, questionnaireAnswersList, setCardIndex, score]);

  const goBack = () => {
    navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } });
    resetActivityReducer();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ImageBackground style={styles.elipse} source={require('../../../../assets/images/end_card_background.png')}>
        <Text style={styles.text}>Activité terminée</Text>
        <Image source={require('../../../../assets/images/aux_fierte.png')} style={styles.image} />
      </ImageBackground>
      <Button style={styles.button} caption="Terminer" onPress={goBack} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: YELLOW[100],
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  text: {
    ...FIRA_SANS_BLACK.XL,
    color: GREY[800],
    marginVertical: MARGIN.XXL,
  },
  image: {
    height: 160,
    resizeMode: 'contain',
    marginTop: MARGIN.XL,
  },
  elipse: {
    height: 320,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    marginBottom: MARGIN.XL,
    marginHorizontal: MARGIN.XL,
  },
});

const mapStateToProps = (state: StateType) => ({
  activity: state.activities.activity,
  questionnaireAnswersList: state.activities.questionnaireAnswersList,
  score: state.activities.score,
});

const mapDispatchToProps = dispatch => ({
  setCardIndex: index => dispatch(Actions.setCardIndex(index)),
  resetActivityReducer: () => dispatch(Actions.resetActivityReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EndCard);
