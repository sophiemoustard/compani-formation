import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Activities from '../../api/activities';
import { ActivityType } from '../../types/ActivityType';
import { CardType } from '../../types/CardType';
import { GREY } from '../../styles/colors';
import ExitActivityModal from '../../components/activities/ExitActivityModal';
import CardFooter from '../../components/cards/CardFooter';
import StartCardTemplate from './cardTemplates/StartCardTemplate';
import EndCardTemplate from './cardTemplates/EndCardTemplate';
import CardHeader from '../../components/cards/CardHeader';
import { MARGIN } from '../../styles/metrics';
import CardTemplate from './cardTemplates/CardTemplate';

interface CardContainerProps {
  route: { params: { activityId: string, courseId: string } },
  navigation: { navigate: (path: string, params: object) => {} },
}

const CardContainer = ({ route, navigation }: CardContainerProps) => {
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [swipeEnabled, setSwipeEnabled] = useState(true);

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
    BackHandler.addEventListener(
      'hardwareBackPress',
      () => { setExitConfirmationModal(true); return true; }
    );
  });

  const renderCardScreen = (card: CardType, index: number) => (
    <Tab.Screen key={index} name={`template${index}`}>
      {() => (
        <View style={styles.cardScreen}>
          <CardHeader onPress={() => setExitConfirmationModal(true)} />
          <ExitActivityModal onPressConfirmButton={goBack}
            onPressCancelButton={() => setExitConfirmationModal(false)}
            visible={exitConfirmationModal} />
          <CardTemplate card={card} onPressExit={() => setExitConfirmationModal(true)}
            onPressNext={() => null} onPressBack={() => null} allowSwipe={isAllowed => setSwipeEnabled(isAllowed)}/>
          <CardFooter index={index} template={ card.template } />
        </View>
      )}
    </Tab.Screen>
  );

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {activity && activity.cards.length > 0 && (
        <Tab.Navigator tabBar={() => null} swipeEnabled={swipeEnabled}>
          <Tab.Screen key={0} name={'template-1'} >
            {() => <StartCardTemplate />}
          </Tab.Screen>
          {activity.cards.map((card, index) => renderCardScreen(card, index))}
          <Tab.Screen key={activity.cards.length + 1} name={`template${activity.cards.length}`}>
            {() => <EndCardTemplate courseId={route.params.courseId} />}
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
  closeButton: {
    margin: MARGIN.MD,
  },
});

export default CardContainer;
