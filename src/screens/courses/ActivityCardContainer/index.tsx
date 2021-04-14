import React, { useEffect, useContext } from 'react';
import { BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import Activities from '../../../api/activities';
import { ActivityType } from '../../../types/ActivityType';
import { CardType } from '../../../types/CardType';
import { NavigationType } from '../../../types/NavigationType';
import { Context as AuthContext } from '../../../context/AuthContext';
import StartCard from '../cardTemplates/StartCard';
import ActivityEndCard from '../cardTemplates/ActivityEndCard';
import { StateType } from '../../../types/store/StoreType';
import ActivityActions from '../../../store/activities/actions';
import CardsActions from '../../../store/cards/actions';
import CardScreen from '../CardScreen';
import { QuestionnaireAnswerType } from '../../../types/store/CardStoreType';
import { ActivityHistoryType } from '../../../types/ActivityHistoryType';

interface ActivityCardContainerProps {
  route: { params: { activityId: string, profileId: string } },
  navigation: NavigationType,
  activity: ActivityType,
  cardIndex: number | null,
  isCourse: boolean,
  exitConfirmationModal: boolean,
  cards: Array<CardType>,
  activityHistories: Array<ActivityHistoryType>,
  setActivity: (activity: ActivityType | null) => void,
  setCards: (activity: Array<CardType> | null) => void,
  setExitConfirmationModal: (boolean) => void,
  resetActivityReducer: () => void,
  resetCardReducer: () => void,
  setQuestionnaireAnswersList: (qalist: Array<QuestionnaireAnswerType>) => void,
}

const ActivityCardContainer = ({
  route,
  navigation,
  activity,
  cards,
  cardIndex,
  isCourse,
  exitConfirmationModal,
  activityHistories,
  setActivity,
  setCards,
  setExitConfirmationModal,
  resetActivityReducer,
  resetCardReducer,
  setQuestionnaireAnswersList,
}: ActivityCardContainerProps) => {
  const { signOut } = useContext(AuthContext);

  const getQuestionnaireAnswersList = () => {
    if (isCourse) {
      const activityHistory = activityHistories[activityHistories.length - 1];
      if (activityHistory?.questionnaireAnswersList) {
        setQuestionnaireAnswersList(activityHistory.questionnaireAnswersList);
      }
    }
  };

  const getActivity = async () => {
    try {
      const fetchedActivity = await Activities.getActivity(route.params.activityId);
      setActivity(fetchedActivity);
      setCards(fetchedActivity.cards);
    } catch (e) {
      if (e.status === 401) signOut();
      setActivity(null);
      setCards([]);
    }
  };

  const goBack = async () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);

    const { profileId } = route.params;
    if (isCourse) navigation.navigate('CourseProfile', { courseId: profileId, endedActivity: activity?._id });
    else navigation.navigate('SubProgramProfile', { subProgramId: profileId });

    resetCardReducer();
    resetActivityReducer();
  };

  useEffect(() => {
    async function fetchData() {
      await getActivity();
      getQuestionnaireAnswersList();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hardwareBackPress = () => {
    if (cardIndex === null) goBack();
    else setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIndex]);

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {cards.length > 0 && (
        <Tab.Navigator tabBar={() => <></>} swipeEnabled={false}>
          <Tab.Screen key={0} name={'startCard'} >
            {() => <StartCard title={activity?.name} goBack={goBack} />}
          </Tab.Screen>
          {cards.map((_, index) => (
            <Tab.Screen key={index} name={`card-${index}`}>
              {() => <CardScreen index={index} goBack={goBack} />}
            </Tab.Screen>
          ))}
          <Tab.Screen key={cards.length + 1} name={`card-${cards.length}`}>
            {() => <ActivityEndCard goBack={goBack} />}
          </Tab.Screen>
        </Tab.Navigator>)}
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  activity: state.activities.activity,
  cards: state.cards.cards,
  cardIndex: state.cards.cardIndex,
  exitConfirmationModal: state.cards.exitConfirmationModal,
  isCourse: state.courses.isCourse,
  activityHistories: state.activities.activityHistories,
});

const mapDispatchToProps = dispatch => ({
  setActivity: activity => dispatch(ActivityActions.setActivity(activity)),
  setCards: cards => dispatch(CardsActions.setCards(cards)),
  setExitConfirmationModal: openModal => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  resetActivityReducer: () => dispatch(ActivityActions.resetActivityReducer()),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
  setQuestionnaireAnswersList: questionnaireAnswersList =>
    dispatch(CardsActions.setQuestionnaireAnswersList(questionnaireAnswersList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCardContainer);
