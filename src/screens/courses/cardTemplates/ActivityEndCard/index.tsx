import { useEffect } from 'react';
import { Text, Image, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import asyncStorage from '../../../../core/helpers/asyncStorage';
import NiPrimaryButton from '../../../../components/form/PrimaryButton';
import { StateType } from '../../../../types/store/StoreType';
import { CourseModeType } from '../../../../types/store/CourseStoreType';
import ActivityHistories from '../../../../api/activityHistories';
import { ActivityType, QuestionnaireAnswersType } from '../../../../types/ActivityTypes';
import CardsActions from '../../../../store/cards/actions';
import styles from '../../../../styles/endCard';
import commonStyles from '../../../../styles/common';
import { achievementJingle } from '../../../../core/helpers/utils';
import { LEARNER } from '../../../../core/data/constants';

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
      const payload = questionnaireAnswersList?.length
        ? { user: userId, activity: activity._id, score, questionnaireAnswersList }
        : { user: userId, activity: activity._id, score };

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
        <ImageBackground style={styles.elipse} source={require('../../../../../assets/images/end_card_background.png')}>
          <Text style={styles.text}>Activité terminée</Text>
          <Image source={require('../../../../../assets/images/aux_fierte.png')} style={styles.image} />
        </ImageBackground>
        <NiPrimaryButton customStyle={styles.button} caption="Terminer" onPress={goBack} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({
  questionnaireAnswersList: state.cards.questionnaireAnswersList,
  score: state.cards.score,
  mode: state.courses.mode,
});

const mapDispatchToProps = dispatch => ({
  setCardIndex: index => dispatch(CardsActions.setCardIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityEndCard);
