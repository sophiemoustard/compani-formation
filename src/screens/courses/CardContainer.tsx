import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Activities from '../../api/activities';
import { ActivityType } from '../../types/ActivityType';
import { CardType } from '../../types/CardType';
import { GREY } from '../../styles/colors';
import ExitActivityModal from '../../components/activities/ExitActivityModal';
import Footer from '../../components/cards/Footer';
import IconButton from '../../components/IconButton';
import { ICON, MARGIN } from '../../styles/metrics';
import BeginActivityTemplate from './cardTemplates/BeginActivityTemplate';
import EndActivityTemplate from './cardTemplates/EndActivityTemplate';

interface CardContainerProps {
  route: { params: { activityId: string, courseId: string } },
  navigation: { navigate: (path: string, params: object) => {} },
}

const CardContainer = ({ route, navigation }: CardContainerProps) => {
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);

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

  const renderCardTemplate = (card: CardType, index: number) => (
    <View>
      <IconButton name='x-circle' onPress={() => setExitConfirmationModal(true) } size={ICON.LG}
        color={GREY['700']} style={styles.closeButton} />
      <Text>{card.template}</Text>
      <Footer index={index} template={ card.template } ></Footer>
    </View>
  );

  const renderCardScreen = (card: CardType, index: number) => (
    <Tab.Screen key={index} name={`template${index}`}>
      {() => (
        <View style={styles.cardScreen}>
          <ExitActivityModal onPressConfirmButton={goBack} onPressCancelButton={() => setExitConfirmationModal(false)}
            visible={exitConfirmationModal} />
          {renderCardTemplate(card, index)}
        </View>
      )}
    </Tab.Screen>
  );

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {activity && activity.cards.length > 0 && (
        <Tab.Navigator tabBar={() => <></>}>
          <Tab.Screen key={0} name={'template-1'} >
            {() => <BeginActivityTemplate />}
          </Tab.Screen>
          {activity.cards.map((card, index) => renderCardScreen(card, index))}
          <Tab.Screen key={activity.cards.length + 1} name={`template${activity.cards.length}`}>
            {() => <EndActivityTemplate courseId={route.params.courseId} />}
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
