// @ts-nocheck

import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import get from 'lodash/get';
import { AppState, AppStateStatus, BackHandler, Image } from 'react-native';
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
import { LEARNER, TRAINER } from '../../../core/data/constants';
import { ActionType } from '../../../context/types';

interface ActivityCardContainerProps extends StackScreenProps<RootStackParamList, 'ActivityCardContainer'> {
  cardIndex: number | null,
  exitConfirmationModal: boolean,
  cards: CardType[],
  setCards: (activity: CardType[] | null) => void,
  setExitConfirmationModal: (boolean: boolean) => void,
  resetCardReducer: () => void,
  setStatusBarVisible: (boolean: boolean) => void,
}

const ActivityCardContainer = ({
  route,
  navigation,
  cards,
  cardIndex,
  exitConfirmationModal,
  setCards,
  setExitConfirmationModal,
  resetCardReducer,
  setStatusBarVisible,
}: ActivityCardContainerProps) => {
  const [activity, setActivity] = useState<ActivityWithCardsType | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const timer = useRef<number>(0);
  const [finalTimer, setFinalTimer] = useState<number>(0);
  const { profileId, mode } = route.params;

  useEffect(() => { setStatusBarVisible(false); }, [setStatusBarVisible]);

  useEffect(() => {
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

    getActivity();
  }, [route.params.activityId, setCards]);

  useEffect(() => {
    async function prefetchImages() {
      const imagesToPrefetch: Promise<boolean>[] = cards
        .filter(c => get(c, 'media.type') === 'image' && !!get(c, 'media.link'))
        .map(c => Image.prefetch(get(c, 'media.link')));

      if (imagesToPrefetch.length) await Promise.all(imagesToPrefetch.map(i => i.catch(e => e)));
    }
    prefetchImages();
  }, [cards]);

  const pauseTimer = useCallback(() => { if (interval.current) clearInterval(interval.current); }, []);

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') startTimer();
    else pauseTimer();
  }, [pauseTimer]);

  useEffect(() => {
    const { remove } = AppState.addEventListener('change', handleAppStateChange);
    return () => { remove(); };
  }, [handleAppStateChange]);

  const startTimer = () => {
    interval.current = setInterval(() => { timer.current += 1; }, 1000);
  };

  const stopTimer = useCallback(() => {
    if (interval.current) clearInterval(interval.current);
    setFinalTimer(timer.current);
  }, []);

  const navigateNext = useCallback(() => {
    if (mode === LEARNER) {
      navigation.navigate('LearnerCourseProfile', { courseId: profileId, endedActivity: activity?._id });
    } else if (mode === TRAINER) {
      navigation.navigate('TrainerCourseProfile', { courseId: profileId });
    } else {
      navigation.navigate('SubProgramProfile', { subProgramId: profileId });
    }
  }, [activity?._id, mode, navigation, profileId]);

  const goBack = useCallback(
    async () => {
      if (exitConfirmationModal) setExitConfirmationModal(false);

      stopTimer();
      navigateNext();
      setIsActive(false);
      resetCardReducer();
    },
    [exitConfirmationModal, navigateNext, resetCardReducer, setExitConfirmationModal, stopTimer]
  );

  const hardwareBackPress = useCallback(() => {
    if (cardIndex === null) goBack();
    else setExitConfirmationModal(true);

    return true;
  }, [cardIndex, goBack, setExitConfirmationModal]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const Tab = createMaterialTopTabNavigator<RootCardParamList>();

  return isActive
    ? <Tab.Navigator tabBar={() => <></>} screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen key={0} name={'startCard'} >
        {() => <StartCard title={activity?.name || ''} goBack={goBack} isLoading={!(cards.length > 0 && activity)}
          startTimer={startTimer} />}
      </Tab.Screen>
      {cards.length > 0 && activity &&
        <>
          {cards.map((_, index) => (
            <Tab.Screen key={index} name={`card-${index}`}>
              {() => <CardScreen index={index} goBack={goBack} />}
            </Tab.Screen>
          ))}
          <Tab.Screen key={cards.length + 1} name={`card-${cards.length}`}>
            {() => <ActivityEndCard goBack={goBack} activity={activity} mode={mode} stopTimer={stopTimer}
              finalTimer={finalTimer} />}
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
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setCards: (cards: CardType[]) => dispatch(CardsActions.setCards(cards)),
  setExitConfirmationModal: (openModal: boolean) => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
  setStatusBarVisible: (statusBarVisible: boolean) => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCardContainer);
