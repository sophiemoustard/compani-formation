import React, { useEffect, useContext, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Activities from '../../../api/activities';
import { ActivityType } from '../../../types/ActivityType';
import { CardType } from '../../../types/CardType';
import { NavigationType } from '../../../types/NavigationType';
import ExitModal from '../../../components/ExitModal';
import { Context as AuthContext } from '../../../context/AuthContext';
import StartCard from '../cardTemplates/StartCard';
import EndCard from '../cardTemplates/EndCard';
import CardTemplate from '../cardTemplates/CardTemplate';
import { StateType } from '../../../types/store/StoreType';
import ActivityActions from '../../../store/activities/actions';
import CardsActions from '../../../store/cards/actions';
import { SWIPE_SENSIBILITY } from '../../../core/data/constants';
import styles from './styles';

interface ActivityCardContainerProps {
  route: { params: { activityId: string, profileId: string } },
  navigation: NavigationType,
  activity: ActivityType,
  cardIndex: number | null,
  isCourse: boolean,
  exitConfirmationModal: boolean,
  cards: Array<CardType>,
  setActivity: (activity: ActivityType | null) => void,
  setCards: (activity: Array<CardType> | null) => void,
  setExitConfirmationModal: (boolean) => void,
  resetActivityReducer: () => void,
}

const ActivityCardContainer = ({
  route,
  navigation,
  activity,
  cards,
  cardIndex,
  isCourse,
  exitConfirmationModal,
  setActivity,
  setCards,
  setExitConfirmationModal,
  resetActivityReducer,
}: ActivityCardContainerProps) => {
  const { signOut } = useContext(AuthContext);
  const [isLeftSwipeEnabled, setIsLeftSwipeEnabled] = useState<boolean>(true);
  const [isRightSwipeEnabled, setIsRightSwipeEnabled] = useState<boolean>(false);

  const getActivity = async () => {
    try {
      const fetchedActivity = await Activities.getActivity(route.params.activityId);
      setActivity(fetchedActivity);
      setCards(fetchedActivity.cards);
    } catch (e) {
      if (e.status === 401) signOut();
      setActivity(null);
    }
  };

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    resetActivityReducer();
    if (isCourse) {
      navigation.navigate('CourseProfile', { courseId: route.params.profileId, endedActivity: activity._id });
    } else navigation.navigate('SubProgramProfile', { subProgramId: route.params.profileId });
  };

  useEffect(() => {
    async function fetchData() { await getActivity(); }
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

  const onSwipe = (index, event) => {
    if (event.nativeEvent.translationX > SWIPE_SENSIBILITY && index > 0 && isLeftSwipeEnabled) {
      navigation.navigate(`card-${index - 1}`);
    }

    if (event.nativeEvent.translationX < -SWIPE_SENSIBILITY && isRightSwipeEnabled) {
      navigation.navigate(`card-${index + 1}`);
    }
  };

  const renderCardScreen = (index: number) => (
    <Tab.Screen key={index} name={`card-${index}`}>
      {() => (
        <PanGestureHandler onGestureEvent={event => onSwipe(index, event)}
          activeOffsetX={[-SWIPE_SENSIBILITY, SWIPE_SENSIBILITY]}>
          <View style={styles.cardScreen}>
            <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
              onPressCancelButton={() => setExitConfirmationModal(false)}
              title={'Êtes-vous sûr de cela ?'} contentText={'Tous vos progrès dans l\'activité seront perdus'} />
            <CardTemplate index={index} setIsLeftSwipeEnabled={setIsLeftSwipeEnabled}
              setIsRightSwipeEnabled={setIsRightSwipeEnabled} />
          </View>
        </PanGestureHandler>
      )}
    </Tab.Screen>
  );

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {cards.length > 0 && (
        <Tab.Navigator tabBar={() => <></>} swipeEnabled={false}>
          <Tab.Screen key={0} name={'startCard'} >
            {() => <StartCard title={activity.name} profileId={route.params.profileId} />}
          </Tab.Screen>
          {cards.map((_, index) => renderCardScreen(index))}
          <Tab.Screen key={cards.length + 1} name={`card-${cards.length}`}>
            {() => <EndCard profileId={route.params.profileId} />}
          </Tab.Screen>
        </Tab.Navigator>)}
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  activity: state.activities.activity,
  cards: state.cards.cards,
  cardIndex: state.cards.cardIndex,
  exitConfirmationModal: state.activities.exitConfirmationModal,
  isCourse: state.courses.isCourse,
});

const mapDispatchToProps = dispatch => ({
  setActivity: activity => dispatch(ActivityActions.setActivity(activity)),
  setCards: cards => dispatch(CardsActions.setCards(cards)),
  setExitConfirmationModal: openModal => dispatch(ActivityActions.setExitConfirmationModal(openModal)),
  resetActivityReducer: () => dispatch(ActivityActions.resetActivityReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCardContainer);
