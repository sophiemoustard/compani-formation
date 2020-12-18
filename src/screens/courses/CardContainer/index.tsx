import React, { useEffect, useContext } from 'react';
import { View, BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import Activities from '../../../api/activities';
import { ActivityType } from '../../../types/ActivityType';
import { NavigationType } from '../../../types/NavigationType';
import ExitModal from '../../../components/ExitModal';
import { Context as AuthContext } from '../../../context/AuthContext';
import StartCard from '../cardTemplates/StartCard';
import EndCard from '../cardTemplates/EndCard';
import CardTemplate from '../cardTemplates/CardTemplate';
import { StateType } from '../../../types/store/StoreType';
import Actions from '../../../store/activities/actions';
import styles from './styles';

interface CardContainerProps {
  route: { params: { activityId: string, profileId: string } },
  navigation: NavigationType,
  activity: ActivityType,
  cardIndex: number | null,
  isCourse: boolean,
  exitConfirmationModal: boolean,
  setActivity: (activity: ActivityType | null) => void,
  setExitConfirmationModal: (boolean) => void,
  resetActivityReducer: () => void,
}

const CardContainer = ({
  route,
  navigation,
  activity,
  cardIndex,
  isCourse,
  exitConfirmationModal,
  setActivity,
  setExitConfirmationModal,
  resetActivityReducer,
}: CardContainerProps) => {
  const { signOut } = useContext(AuthContext);

  const getActivity = async () => {
    try {
      const fetchedActivity = await Activities.getActivity(route.params.activityId);
      setActivity(fetchedActivity);
    } catch (e) {
      if (e.status === 401) signOut();
      setActivity(null);
    }
  };

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    resetActivityReducer();
    if (isCourse) navigation.navigate('CourseProfile', { courseId: route.params.profileId });
    else navigation.navigate('SubProgramProfile', { subProgramId: route.params.profileId });
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

  useEffect(
    () => { BackHandler.addEventListener('hardwareBackPress', hardwareBackPress); },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cardIndex]
  );

  const renderCardScreen = (index: number) => (
    <Tab.Screen key={index} name={`card-${index}`}>
      {() => (
        <View style={styles.cardScreen}>
          <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
            onPressCancelButton={() => setExitConfirmationModal(false)}
            title='Es-tu sûr de cela ?' contentText='Tous tes progrès dans la leçon seront perdus.' />
          <CardTemplate index={index} />
        </View>
      )}
    </Tab.Screen>
  );

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {activity && activity.cards.length > 0 && (
        <Tab.Navigator tabBar={() => <></>} swipeEnabled={false}>
          <Tab.Screen key={0} name={'startCard'} >
            {() => <StartCard title={activity.name} profileId={route.params.profileId} />}
          </Tab.Screen>
          {activity.cards.map((_, index) => renderCardScreen(index))}
          <Tab.Screen key={activity.cards.length + 1} name={`card-${activity.cards.length}`}>
            {() => <EndCard profileId={route.params.profileId} />}
          </Tab.Screen>
        </Tab.Navigator>)}
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  activity: state.activities.activity,
  cardIndex: state.activities.cardIndex,
  exitConfirmationModal: state.activities.exitConfirmationModal,
  isCourse: state.courses.isCourse,
});

const mapDispatchToProps = dispatch => ({
  setActivity: activity => dispatch(Actions.setActivity(activity)),
  setExitConfirmationModal: openModal => dispatch(Actions.setExitConfirmationModal(openModal)),
  resetActivityReducer: () => dispatch(Actions.resetActivityReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
