/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused } from '@react-navigation/native';
import Activities from '../../api/activities';
import { ActivityType } from '../../types/ActivityType';
import TemplateExample from '../../components/TemplateExample';

interface ActivityProfileProps {
  route: { params: { activityId?: string } },
}

const Activity = ({ route }: ActivityProfileProps) => {
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const [cardsPages, setCardsPages] = useState<Array<Object>>([]);

  const getActivity = async () => {
    const fetchedActivity = await Activities.getActivity(route.params.activityId);
    setActivity(fetchedActivity);
    setCardsPages(fetchedActivity.cards.map(
      (card, index) => (
        <Tab.Screen key={index} name={`TemplateType${index}`}>
          {() => <TemplateExample template={card.template} />}
        </Tab.Screen>
      )
    ));
  };

  useEffect(() => {
    async function fetchData() { await getActivity(); }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData() { await getActivity(); }
    if (isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      {
        activity && cardsPages.length > 0 && (
          <Tab.Navigator tabBar={() => <></>}>
            {cardsPages}
          </Tab.Navigator>
        )}
    </>
  );
};

export default Activity;
