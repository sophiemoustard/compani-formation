import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Activities from '../../api/activities';
import { ActivityType } from '../../types/ActivityType';

interface CardContainerProps {
  route: { params: { activityId: string } },
}

const Activity = ({ route }: CardContainerProps) => {
  const [activity, setActivity] = useState<ActivityType | null>(null);

  const getActivity = async () => {
    const fetchedActivity = await Activities.getActivity(route.params.activityId);
    setActivity(fetchedActivity);
  };

  useEffect(() => {
    async function fetchData() { await getActivity(); }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {activity && activity.cards.length > 0 && (
        <Tab.Navigator tabBar={() => <></>}>
          {activity.cards.map(
            (card, index) => (
              <Tab.Screen key={index} name={`TemplateType${index}`}>
                {() => <Text>{card.template}</Text>}
              </Tab.Screen>
            )
          )}
        </Tab.Navigator>)}
    </>
  );
};

export default Activity;
