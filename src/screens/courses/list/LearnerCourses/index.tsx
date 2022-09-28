import 'array-flat-polyfill';
import { useState, useEffect, useCallback, useMemo, useReducer } from 'react';
import { Text, View, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { useIsFocused, CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import get from 'lodash/get';
import Courses from '../../../../api/courses';
import SubPrograms from '../../../../api/subPrograms';
import NextStepCell from '../../../../components/steps/NextStepCell';
import ProgramCell from '../../../../components/ProgramCell';
import CoursesSection, { EVENT_SECTION } from '../../../../components/CoursesSection';
import HomeScreenFooter from '../../../../components/HomeScreenFooter';
import { getLoggedUserId } from '../../../../store/main/selectors';
import CoursesActions from '../../../../store/courses/actions';
import commonStyles from '../../../../styles/common';
import { RootBottomTabParamList, RootStackParamList } from '../../../../types/NavigationType';
import { SubProgramType } from '../../../../types/CourseTypes';
import { NextSlotsStepType } from '../../../../types/StepTypes';
import { ActionWithoutPayloadType } from '../../../../types/store/StoreType';
import { CourseModeType } from '../../../../types/store/CourseStoreType';
import { getCourseProgress, getTheoreticalHours } from '../../../../core/helpers/utils';
import { E_LEARNING, LEARNER, PEDAGOGY, TESTER } from '../../../../core/data/constants';
import styles from '../styles';
import { formatNextSteps } from '../helper';
import LearnerEmptyState from '../LearnerEmptyState';

interface LearnerCoursesProps extends CompositeScreenProps<
StackScreenProps<RootBottomTabParamList>,
StackScreenProps<RootStackParamList>
> {
  setMode: (value: CourseModeType) => void,
  loggedUserId: string | null,
}

const SET_COURSES = 'SET_COURSES';
const RESET_COURSES = 'RESET_COURSES';

const courseReducer = (state, action) => {
  switch (action.type) {
    case SET_COURSES:
      return {
        onGoing: action.payload.filter(course => getCourseProgress(course) < 1),
        achieved: action.payload.filter(course => getCourseProgress(course) === 1),
      };
    case RESET_COURSES:
      return { onGoing: [], achieved: [] };
    default:
      return state;
  }
};

const renderNextStepsItem = (step: NextSlotsStepType) => <NextStepCell nextSlotsStep={step} />;

const LearnerCourses = ({ setMode, navigation, loggedUserId }: LearnerCoursesProps) => {
  const [courses, dispatch] = useReducer(courseReducer, { onGoing: [], achieved: [] });
  const [elearningDraftSubPrograms, setElearningDraftSubPrograms] = useState<SubProgramType[]>(new Array(0));

  const getCourses = useCallback(async () => {
    try {
      const fetchedCourses = await Courses.getCourseList({ action: PEDAGOGY });
      dispatch({ type: SET_COURSES, payload: fetchedCourses });
    } catch (e: any) {
      console.error(e);
      dispatch({ type: RESET_COURSES });
    }
  }, []);

  const getElearningDraftSubPrograms = useCallback(async () => {
    try {
      const fetchedSubPrograms = await SubPrograms.getELearningDraftSubPrograms();
      setElearningDraftSubPrograms(fetchedSubPrograms);
    } catch (e: any) {
      console.error(e);
      setElearningDraftSubPrograms([]);
    }
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getCourses(), getElearningDraftSubPrograms()]);
    }
    if (loggedUserId && isFocused) {
      setMode(LEARNER);
      fetchData();
    }
  }, [loggedUserId, isFocused, getCourses, getElearningDraftSubPrograms, setMode]);

  const onPressProgramCell = (id: string, isCourse: boolean) => {
    if (isCourse) navigation.navigate('LearnerCourseProfile', { courseId: id });
    else {
      setMode(TESTER);
      navigation.navigate('SubProgramProfile', { subProgramId: id });
    }
  };

  const getElearningSteps = steps => steps.filter(step => step.type === E_LEARNING);

  const renderCourseItem = course => <ProgramCell program={get(course, 'subProgram.program') || {}} misc={course.misc}
    theoreticalHours={getTheoreticalHours(getElearningSteps(get(course, 'subProgram.steps')))}
    progress={getCourseProgress(course)} onPress={() => onPressProgramCell(course._id, true)} />;

  const renderSubProgramItem = subProgram => <ProgramCell onPress={() => onPressProgramCell(subProgram._id, false)}
    theoreticalHours={getTheoreticalHours(getElearningSteps(subProgram.steps))}
    program={get(subProgram, 'program') || {}} />;

  const nextSteps: NextSlotsStepType[] = useMemo(() => formatNextSteps(courses.onGoing), [courses.onGoing]);

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={commonStyles.title} testID='header'>Mes formations</Text>
        {!!nextSteps.length &&
          <View style={styles.nextSteps}>
            <CoursesSection items={nextSteps} title='Mes prochains rendez-vous' countStyle={styles.pinkCount}
              renderItem={renderNextStepsItem} type={EVENT_SECTION} />
          </View>
        }
        <ImageBackground imageStyle={styles.leftBackground} style={styles.sectionContainer}
          source={require('../../../../../assets/images/yellow_section_background.png')}>
          <CoursesSection items={courses.onGoing} title='Mes formations en cours' renderItem={renderCourseItem}
            countStyle={styles.yellowCount} renderEmptyState={() => <LearnerEmptyState />}/>
        </ImageBackground>
        {!!courses.achieved.length &&
          <ImageBackground imageStyle={styles.rightBackground} style={styles.sectionContainer}
            source={require('../../../../../assets/images/green_section_background.png')}>
            <CoursesSection items={courses.achieved} title='Mes formations terminées' renderItem={renderCourseItem}
              countStyle={styles.greenCount} />
          </ImageBackground>
        }
        {!!elearningDraftSubPrograms.length &&
          <ImageBackground imageStyle={styles.leftBackground} style={styles.sectionContainer}
            source={require('../../../../../assets/images/purple_section_background.png')}>
            <CoursesSection items={elearningDraftSubPrograms} title='Mes formations à tester'
              countStyle={styles.purpleCount} renderItem={renderSubProgramItem} />
          </ImageBackground>
        }
        <HomeScreenFooter source={require('../../../../../assets/images/pa_aidant_balade_rose.png')} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setMode: (value: CourseModeType) => dispatch(CoursesActions.setMode(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnerCourses);
