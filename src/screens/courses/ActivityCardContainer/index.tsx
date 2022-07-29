import { useEffect, useState } from 'react';
import get from 'lodash/get';
import { BackHandler, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import Activities from '../../../api/activities';
import { ActivityWithCardsType } from '../../../types/ActivityTypes';
import { CardType } from '../../../types/CardType';
import { RootCardParamList, RootStackParamList } from '../../../types/NavigationType';
import StartCard from '../cardTemplates/StartCard';
import ActivityEndCard from '../cardTemplates/ActivityEndCard';
import { StateType } from '../../../types/store/StoreType';
import MainActions from '../../../store/main/actions';
import CardsActions from '../../../store/cards/actions';
import CardScreen from '../CardScreen';

interface ActivityCardContainerProps extends StackScreenProps<RootStackParamList, 'ActivityCardContainer'> {
  cardIndex: number | null,
  isCourse: boolean,
  exitConfirmationModal: boolean,
  cards: CardType[],
  setCards: (activity: CardType[] | null) => void,
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
  const [activity, setActivity] = useState<ActivityWithCardsType | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    setStatusBarVisible(false);
  }, [setStatusBarVisible]);

  const getActivity = async () => {
    try {
      const fetchedActivity = await Activities.getActivity(route.params.activityId);
      setActivity(fetchedActivity);
      setCards(fetchedActivity.cards);
    } catch (e: any) {
      console.error(e);
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

  useEffect(() => {
    async function prefetchImages() {
      const imagesToPrefetch: Promise<boolean>[] = cards
        .filter(c => get(c, 'media.type') === 'image')
        .map(c => Image.prefetch(get(c, 'media.link')));

      if (imagesToPrefetch.length) await Promise.all(imagesToPrefetch.map(i => i.catch(e => e)));
    }
    prefetchImages();
  }, [cards]);

  const goBack = async () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);

    const { profileId } = route.params;
    if (isCourse) navigation.navigate('CourseProfile', { courseId: profileId, endedActivity: activity?._id });
    else navigation.navigate('SubProgramProfile', { subProgramId: profileId });

    setIsActive(false);
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

  const Tab = createMaterialTopTabNavigator<RootCardParamList>();

  return isActive
    ? <Tab.Navigator tabBar={() => <></>} screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen key={0} name={'startCard'} >
        {() => <StartCard title={activity?.name || ''} goBack={goBack} isLoading={!(cards.length > 0 && activity)} />}
      </Tab.Screen>
      {cards.length > 0 && activity &&
         <>
           {cards.map((_, index) => (
             <Tab.Screen key={index} name={`card-${index}`}>
               {() => <CardScreen index={index} goBack={goBack} />}
             </Tab.Screen>
           ))}
           <Tab.Screen key={cards.length + 1} name={`card-${cards.length}`}>
             {() => <ActivityEndCard goBack={goBack} activity={activity} />}
           </Tab.Screen>
         </>
      }
    </Tab.Navigator>
    : null;
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
