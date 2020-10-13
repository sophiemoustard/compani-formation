import React, { useEffect, useContext } from 'react';
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../../../components/form/Button';
import { navigate } from '../../../../navigationRef';
import { PINK, WHITE } from '../../../../styles/colors';
import CardHeader from '../../../../components/cards/CardHeader';
import Actions from '../../../../store/activities/actions';
import { ActivityType } from '../../../../types/ActivityType';
import { QuestionnaireAnswerType } from '../../../../types/store/ActivityStoreType';
import Activities from '../../../../api/activities';
import { Context as AuthContext } from '../../../../context/AuthContext';
import styles from './styles';

interface StartCardProps {
  title: string,
  courseId: string,
  resetActivityReducer: () => void,
  activity: ActivityType,
  setQuestionnaireAnswersList: (qalist: Array<QuestionnaireAnswerType>) => void,
}

const StartCard = ({
  title,
  courseId,
  resetActivityReducer,
  activity,
  setQuestionnaireAnswersList,
}: StartCardProps) => {
  const { signOut } = useContext(AuthContext);

  const getActivityHistory = async () => {
    try {
      const fetchedActivityHistory = await Activities.getActivityHistory(activity._id);

      if (fetchedActivityHistory?.questionnaireAnswersList) {
        setQuestionnaireAnswersList(fetchedActivityHistory.questionnaireAnswersList);
      }
    } catch (e) {
      if (e.status === 401) signOut();
      setQuestionnaireAnswersList([]);
    }
  };

  useEffect(() => {
    async function fetchData() { await getActivityHistory(); }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    resetActivityReducer();
    navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <CardHeader color={WHITE} onPress={() => goBack()} icon='arrow-left' />
      <View style={styles.wrapper}>
        <View>
          <ImageBackground imageStyle={{ resizeMode: 'contain' }} style={styles.imageBackground}
            source={require('../../../../../assets/images/start_card_background.png')}>
            <Image source={require('../../../../../assets/images/doct_liste.png')} style={styles.image} />
          </ImageBackground>
          <Text style={styles.text}>{title}</Text>
        </View>
        <Button style={styles.button} bgColor={WHITE} color={PINK[500]} caption="Démarrer"
          onPress={() => navigate('card-0')} />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  activity: state.activities.activity,
});

const mapDispatchToProps = dispatch => ({
  resetActivityReducer: () => dispatch(Actions.resetActivityReducer()),
  setQuestionnaireAnswersList: questionnaireAnswersList =>
    dispatch(Actions.setQuestionnaireAnswersList(questionnaireAnswersList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartCard);
