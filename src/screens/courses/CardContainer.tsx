import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Activities from '../../api/activities';
import { ActivityType } from '../../types/ActivityType';
import { CardType } from '../../types/CardType';
import { GREY } from '../../styles/colors';
import ExitActivityModal from '../../components/activities/ExitActivityModal';
import StartCard from './cardTemplates/StartCard';
import EndCard from './cardTemplates/EndCard';
import CardTemplate from './cardTemplates/CardTemplate';

interface CardContainerProps {
  route: { params: { activityId: string, courseId: string } },
  navigation: { navigate: (path: string, params: object) => {} },
}

const CardContainer = ({ route, navigation }: CardContainerProps) => {
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [swipeEnabled, setSwipeEnabled] = useState<boolean>(true);

  const getActivity = async () => {
    const fetchedActivity = await Activities.getActivity(route.params.activityId);
    setActivity(fetchedActivity);
  };

  const goBack = () => {
    setExitConfirmationModal(false);
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
    BackHandler.addEventListener('hardwareBackPress', () => { setExitConfirmationModal(true); return true; });
  });

  const renderCardScreen = (card: CardType, index: number) => (
    <Tab.Screen key={index} name={`card-${index}`}>
      {() => (
        <View style={styles.cardScreen}>
          <ExitActivityModal onPressConfirmButton={goBack} onPressCancelButton={() => setExitConfirmationModal(false)}
            visible={exitConfirmationModal} />
          <CardTemplate card={card} index={index} onPressExit={() => setExitConfirmationModal(true)}
            allowSwipe={isAllowed => setSwipeEnabled(isAllowed)}/>
        </View>
      )}
    </Tab.Screen>
  );

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {activity && activity.cards.length > 0 && (
        <Tab.Navigator tabBar={() => <></>} swipeEnabled={swipeEnabled}>
          <Tab.Screen key={0} name={'startCard'} >
            {() => <StartCard allowSwipe={isAllowed => setSwipeEnabled(isAllowed)} />}
          </Tab.Screen>
          {activity.cards.map((card, index) => renderCardScreen(card, index))}
          <Tab.Screen key={activity.cards.length + 1} name={`card-${activity.cards.length}`}>
            {() => <EndCard courseId={route.params.courseId} allowSwipe={isAllowed => setSwipeEnabled(isAllowed)} />}
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

export default CardContainer;
