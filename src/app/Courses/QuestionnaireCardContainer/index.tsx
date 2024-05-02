// @ts-nocheck

import { Dispatch, useContext, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import Questionnaires from '@/api/questionnaires';
import { CardType } from '@/types/CardType';
import { RootStackParamList } from '@/types/NavigationType';
import { StateType } from '@/types/store/StoreType';
import MainActions from '@/store/main/actions';
import CardsActions from '@/store/cards/actions';
import { Context as CardContext } from '@/context/CardContext';
import { ActionType } from '@/context/types';

interface QuestionnaireCardContainerProps extends StackScreenProps<RootStackParamList, 'QuestionnaireCardContainer'> {
  cardIndex: number | null,
  exitConfirmationModal: boolean,
  setCards: (questionnaire: CardType[] | null) => void,
  setExitConfirmationModal: (boolean: boolean) => void,
  resetCardReducer: () => void,
  setStatusBarVisible: (boolean: boolean) => void,
}

const QuestionnaireCardContainer = ({
  cardIndex,
  exitConfirmationModal,
  setCards,
  setExitConfirmationModal,
  resetCardReducer,
  setStatusBarVisible,
}: QuestionnaireCardContainerProps) => {
  const router = useRouter();
  const { questionnaireId, profileId } = useLocalSearchParams();
  const { questionnaire, setQuestionnaire, isActive, setIsActive, setProfileId } = useContext(CardContext);

  useEffect(() => {
    setStatusBarVisible(false);
  }, [setStatusBarVisible]);

  useEffect(() => {
    setProfileId(profileId);
  }, [profileId, setProfileId]);

  const getQuestionnaire = async () => {
    try {
      const fetchedQuestionnaire = await Questionnaires.getQuestionnaire(questionnaireId);
      setQuestionnaire(fetchedQuestionnaire);
      setCards(fetchedQuestionnaire.cards);
    } catch (e: any) {
      console.error(e);
      setQuestionnaire(null);
      setCards([]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getQuestionnaire();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = async () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);

    router.navigate({ pathname: '/Courses/LearnerCourseProfile', params: { courseId: profileId } });

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

  return isActive && questionnaire
    ? <Redirect href={'/Courses/QuestionnaireCardContainer/cardTemplates/QuestionnaireStartCard'}/>
    : null;
};

const mapStateToProps = (state: StateType) => ({
  cardIndex: state.cards.cardIndex,
  exitConfirmationModal: state.cards.exitConfirmationModal,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setCards: (cards: CardType[]) => dispatch(CardsActions.setCards(cards)),
  setExitConfirmationModal: (openModal: boolean) => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
  setStatusBarVisible: (statusBarVisible: boolean) => dispatch(MainActions.setStatusBarVisible(statusBarVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireCardContainer);
