// @ts-nocheck

import { Dispatch, useCallback, useContext, useEffect } from 'react';
import get from 'lodash/get';
import { AppState, AppStateStatus, BackHandler, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Redirect, useLocalSearchParams } from 'expo-router';
import Activities from '@/api/activities';
import { CardType } from '@/types/CardType';
import { RootStackParamList } from '@/types/NavigationType';
import { StateType } from '@/types/store/StoreType';
import MainActions from '@/store/main/actions';
import CardsActions from '@/store/cards/actions';
import { ActionType } from '@/context/types';
import { Context as CardContext } from '@/context/CardContext';

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
  cards,
  cardIndex,
  exitConfirmationModal,
  setCards,
  setExitConfirmationModal,
  resetCardReducer,
  setStatusBarVisible,
}: ActivityCardContainerProps) => {
  const { activityId, profileId, mode } = useLocalSearchParams();
  const {
    activity,
    setActivity,
    startTimer,
    stopTimer,
    navigateNext,
    setProfileId,
    setMode,
    interval,
    isActive,
    setIsActive,
  } = useContext(CardContext);

  useEffect(() => { setStatusBarVisible(false); }, [setStatusBarVisible]);

  useEffect(() => {
    setProfileId(profileId);
    setMode(mode);
  }, [profileId, mode, setProfileId, setMode]);

  useEffect(() => {
    const getActivity = async () => {
      try {
        const fetchedActivity = await Activities.getActivity(activityId);
        setActivity(fetchedActivity);
        setCards(fetchedActivity.cards);
      } catch (e: any) {
        console.error(e);
        setActivity(null);
        setCards([]);
      }
    };

    getActivity();
  }, [activityId, setActivity, setCards]);

  useEffect(() => {
    async function prefetchImages() {
      const imagesToPrefetch: Promise<boolean>[] = cards
        .filter(c => get(c, 'media.type') === 'image' && !!get(c, 'media.link'))
        .map(c => Image.prefetch(get(c, 'media.link')));

      if (imagesToPrefetch.length) await Promise.all(imagesToPrefetch.map(i => i.catch(e => e)));
    }
    prefetchImages();
  }, [cards]);

  const pauseTimer = useCallback(() => { if (interval.current) clearInterval(interval.current); }, [interval]);

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') startTimer();
    else pauseTimer();
  }, [pauseTimer, startTimer]);

  useEffect(() => {
    const { remove } = AppState.addEventListener('change', handleAppStateChange);
    return () => { remove(); };
  }, [handleAppStateChange]);

  const goBack = useCallback(
    async () => {
      if (exitConfirmationModal) setExitConfirmationModal(false);

      stopTimer();
      navigateNext();
      setIsActive(false);
      resetCardReducer();
    },
    [exitConfirmationModal, navigateNext, resetCardReducer, setExitConfirmationModal, setIsActive, stopTimer]
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

  return isActive && activity
    ? <Redirect href={'/Courses/ActivityCardContainer/cardTemplates/StartCard'}/>
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
