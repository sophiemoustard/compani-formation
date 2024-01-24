import { Dispatch, useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../../core/helpers/asyncStorage';
import NiPrimaryButton from '../../../../components/form/PrimaryButton';
import { StateType } from '../../../../types/store/StoreType';
import ActivityHistories from '../../../../api/activityHistories';
import { ActivityType, QuestionnaireAnswersType } from '../../../../types/ActivityTypes';
import CardsActions from '../../../../store/cards/actions';
import styles from '../../../../styles/endCard';
import commonStyles from '../../../../styles/common';
import { achievementJingle } from '../../../../core/helpers/utils';
import { LEARNER } from '../../../../core/data/constants';
import { CourseModeType } from '../../../../types/CourseTypes';
import { ActionType } from '../../../../context/types';

interface ActivityEndCardProps {
  mode: CourseModeType,
  activity: ActivityType,
  questionnaireAnswersList: QuestionnaireAnswersType[],
  score: number,
  setCardIndex: (index: number | null) => void,
  goBack: () => void,
}

const ActivityEndCard = ({
  mode,
  activity,
  questionnaireAnswersList,
  score,
  setCardIndex,
  goBack,
}: ActivityEndCardProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    async function saveHistory() {
      const userId = await asyncStorage.getUserId();

      if (!userId || !activity._id) return;

      const payload = {
        activity: activity._id,
        user: userId,
        score,
        ...(questionnaireAnswersList?.length && { questionnaireAnswersList }),
      };

      await ActivityHistories.createActivityHistories(payload);
    }

    if (isFocused) {
      if (mode === LEARNER) saveHistory();
      setCardIndex(null);
      achievementJingle();
    }
  }, [isFocused, activity, questionnaireAnswersList, setCardIndex, score, mode]);

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ImageBackground style={styles.elipse}
          source={require('../../../../../assets/images/end_card_background.webp')}>
          <Text style={styles.text}>Activité terminée</Text>
          <Image source={require('../../../../../assets/images/aux_fierte.webp')} style={styles.image} />
        </ImageBackground>
        <NiPrimaryButton customStyle={styles.button} caption="Terminer" onPress={goBack} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({
  questionnaireAnswersList: state.cards.questionnaireAnswersList,
  score: state.cards.score,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  setCardIndex: (index: number | null) => dispatch(CardsActions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityEndCard);
