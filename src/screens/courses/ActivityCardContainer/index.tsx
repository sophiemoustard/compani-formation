import React, { useEffect, useContext, useState } from 'react';
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
import MainActions from '../../../store/main/actions';
import CardsActions from '../../../store/cards/actions';
import CardScreen from '../CardScreen';

interface ActivityCardContainerProps {
  route: { params: { activityId: string, profileId: string } },
  navigation: NavigationType,
  cardIndex: number | null,
  isCourse: boolean,
  exitConfirmationModal: boolean,
  cards: Array<CardType>,
  setCards: (activity: Array<CardType> | null) => void,
  setExitConfirmationModal: (boolean) => void,
  resetCardReducer: () => void,
  setStatusBarVisible: (boolean) => void,
}

const ActivityCardContainer = ({
  route,
  navigation,
  cards,
  cardIndex,
  isCourse,
  exitConfirmationModal,
  setCards,
  setExitConfirmationModal,
  resetCardReducer,
  setStatusBarVisible,
}: ActivityCardContainerProps) => {
  const { signOut } = useContext(AuthContext);
  const [activity, setActivity] = useState<ActivityType | null>(null);

  useEffect(() => {
    setStatusBarVisible(false);
  }, [setStatusBarVisible]);

  const getActivity = async () => {
    try {
      const fetchedActivity = await Activities.getActivity(route.params.activityId);
      setActivity(fetchedActivity);
      setCards(fetchedActivity.cards);
    } catch (e) {
      if (e.response.status === 401) signOut();
      setActivity(null);
      setCards([]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getActivity();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = async () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);

    const { profileId } = route.params;
    if (isCourse) navigation.navigate('CourseProfile', { courseId: profileId, endedActivity: activity?._id });
    else navigation.navigate('SubProgramProfile', { subProgramId: profileId });

    resetCardReducer();
  };

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

  return cards.length > 0 && activity && (
    <Tab.Navigator tabBar={() => <></>} swipeEnabled={false}>
      <Tab.Screen key={0} name={'startCard'} >
        {() => <StartCard title={activity.name} goBack={goBack} />}
      </Tab.Screen>
      {cards.map((_, index) => (
        <Tab.Screen key={index} name={`card-${index}`}>
          {() => <CardScreen index={index} goBack={goBack} />}
        </Tab.Screen>
      ))}
      <Tab.Screen key={cards.length + 1} name={`card-${cards.length}`}>
        {() => <ActivityEndCard goBack={goBack} activity={activity} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const mapStateToProps = (state: StateType) => ({
  cards: state.cards.cards,
  cardIndex: state.cards.cardIndex,
  exitConfirmationModal: state.cards.exitConfirmationModal,
  isCourse: state.courses.isCourse,
});

const mapDispatchToProps = dispatch => ({
  setCards: cards => dispatch(CardsActions.setCards(cards)),
  setExitConfirmationModal: openModal => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
  setStatusBarVisible: statusBarVisible => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCardContainer);
