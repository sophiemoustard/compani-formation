import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, BackHandler } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Activities from '../../api/activities';
import { ActivityType } from '../../types/ActivityType';
import { CardType } from '../../types/CardType';
import { GREY } from '../../styles/colors';
import { ICON, MARGIN } from '../../styles/metrics';
import IconButton from '../../components/IconButton';
import CancelModal from '../../components/modal/CancelModal';

interface CardContainerProps {
  route: { params: { activityId: string } },
  navigation: { navigate: (path: string) => {} }
}

const Activity = ({ route, navigation }: CardContainerProps) => {
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const [openClosingConfirmationModal, setOpenClosingConfirmationModal] = useState<boolean>(false);

  const getActivity = async () => {
    const fetchedActivity = await Activities.getActivity(route.params.activityId);
    setActivity(fetchedActivity);
  };

  const goBack = () => {
    setOpenClosingConfirmationModal(false);
    navigation.navigate('CourseProfile');
  };

  const renderCardScreen = (card: CardType, index: number) => (
    <Tab.Screen key={index} name={`TemplateType${index}`}>
      {() => (
        <View style={styles.cardScreen}>
          <CancelModal onPressConfirmButton={goBack}
            onPressCancelButton={() => setOpenClosingConfirmationModal(false)} visible={openClosingConfirmationModal} />
          <IconButton name='x-circle' onPress={() => setOpenClosingConfirmationModal(true)} size={ICON.LG}
            color={GREY[500]} style={styles.closeButton} />
          <Text>{card.template}</Text>
        </View>
      )}
    </Tab.Screen>
  );

  useEffect(() => {
    async function fetchData() { await getActivity(); }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {activity && activity.cards.length > 0 && (
        <Tab.Navigator tabBar={() => null}>
          {activity.cards.map((card, index) => renderCardScreen(card, index))}
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

export default Activity;
