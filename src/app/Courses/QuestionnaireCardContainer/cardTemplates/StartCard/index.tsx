// @ts-nocheck
import { Dispatch, useCallback, useContext } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { connect } from 'react-redux';
import NiPrimaryButton from '@/components/form/PrimaryButton';
import { PINK, WHITE } from '@/styles/colors';
import CardHeader from '@/components/cards/CardHeader';
import { ActionType, StateType } from '@/types/store/StoreType';
import CardsActions from '@/store/cards/actions';
import styles from './styles';
import { Context as CardContext } from '@/context/CardContext';
import { CardType } from '@/types/CardType';

interface StartCardProps {
  exitConfirmationModal: boolean,
  cards: CardType[],
  setExitConfirmationModal: (boolean: boolean) => void,
  resetCardReducer: () => void,
}

const StartCard = ({ exitConfirmationModal, cards, setExitConfirmationModal, resetCardReducer }: StartCardProps) => {
  const router = useRouter();
  const { questionnaire, startTimer, stopTimer, navigateNext, setIsActive } = useContext(CardContext);
  const isLoading = !(cards.length > 0 && questionnaire);

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

  const onPress = () => {
    if (startTimer) startTimer();
    router.navigate('/Courses/QuestionnaireCardContainer/0');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <CardHeader color={WHITE} onPress={goBack} icon='arrow-left' />
        <View style={styles.wrapper}>
          <View>
            <ImageBackground imageStyle={{ resizeMode: 'contain' }} style={styles.imageBackground}
              source={require('../../../../../../assets/images/start_card_background.webp')}>
              <Image source={require('../../../../../../assets/images/doct_liste.webp')} style={styles.image} />
            </ImageBackground>
            {isLoading
              ? <ActivityIndicator style={styles.loader} color={WHITE} size="large" />
              : <Text style={styles.text}>{questionnaire.name}</Text>}
          </View>
          {!isLoading && <NiPrimaryButton customStyle={styles.button} bgColor={WHITE} color={PINK[500]}
            caption="Démarrer" onPress={onPress} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({
  exitConfirmationModal: state.cards.exitConfirmationModal,
  cards: state.cards.cards,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setExitConfirmationModal: (openModal: boolean) => dispatch(CardsActions.setExitConfirmationModal(openModal)),
  resetCardReducer: () => dispatch(CardsActions.resetCardReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartCard);
