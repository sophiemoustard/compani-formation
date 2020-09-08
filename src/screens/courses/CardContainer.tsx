import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import Activities from '../../api/activities';
import { ActivityType } from '../../types/ActivityType';
import { GREY } from '../../styles/colors';
import ExitActivityModal from '../../components/activities/ExitActivityModal';
import StartCard from './cardTemplates/StartCard';
import EndCard from './cardTemplates/EndCard';
import CardTemplate from './cardTemplates/CardTemplate';
import { ActionType, StateType } from '../../types/StoreType';
import { setActivity, setExitConfirmationModal } from '../../store/actions';

interface CardContainerProps {
  route: { params: { activityId: string, courseId: string } },
  navigation: { navigate: (path: string, params: object) => {} },
  activity: ActivityType,
  cardIndex: number | null,
  exitConfirmationModal: boolean,
  dispatch: ({ type, payload }: ActionType) => void,
}

const CardContainer = ({
  route,
  navigation,
  activity,
  cardIndex,
  exitConfirmationModal,
  dispatch,
}: CardContainerProps) => {
  const getActivity = async () => {
    const fetchedActivity = await Activities.getActivity(route.params.activityId);
    dispatch(setActivity(fetchedActivity));
  };

  const goBack = () => {
    if (exitConfirmationModal) dispatch(setExitConfirmationModal(false));
    navigation.navigate(
      'Home',
      { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId: route.params.courseId } } }
    );
  };

  useEffect(() => {
    async function fetchData() { await getActivity(); }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (cardIndex === null) goBack();
        else dispatch(setExitConfirmationModal(true));
        return true;
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIndex]);

  const renderCardScreen = (index: number) => (
    <Tab.Screen key={index} name={`card-${index}`}>
      {() => (
        <View style={styles.cardScreen}>
          <ExitActivityModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
            onPressCancelButton={() => dispatch(setExitConfirmationModal(false))} />
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
            {() => <StartCard title={activity.name} courseId={route.params.courseId}/>}
          </Tab.Screen>
          {activity.cards.map((card, index) => renderCardScreen(index))}
          <Tab.Screen key={activity.cards.length + 1} name={`card-${activity.cards.length}`}>
            {() => <EndCard courseId={route.params.courseId} />}
          </Tab.Screen>
        </Tab.Navigator>)}
    </>
  );
};

const styles = StyleSheet.create({
  cardScreen: {
    display: 'flex',
    flex: 1,
    backgroundColor: GREY[100],
  },
});

const mapStateToProps = (state: StateType) => ({
  activity: state.activity,
  cardIndex: state.cardIndex,
  exitConfirmationModal: state.exitConfirmationModal,
});

export default connect(mapStateToProps)(CardContainer);
