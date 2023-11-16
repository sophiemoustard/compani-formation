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
import commonStyles from '../../../../styles/common';
import { RootBottomTabParamList, RootStackParamList } from '../../../../types/NavigationType';
import { CourseType, SubProgramType, SubProgramWithProgramType } from '../../../../types/CourseTypes';
import { NextSlotsStepType } from '../../../../types/StepTypes';
import { getCourseProgress, getTheoreticalDuration } from '../../../../core/helpers/utils';
import { LEARNER, PEDAGOGY } from '../../../../core/data/constants';
import styles from '../styles';
import { formatNextSteps, getElearningSteps } from '../helper';
import LearnerEmptyState from '../LearnerEmptyState';
import { StateType } from '../../../../types/store/StoreType';

interface LearnerCoursesProps extends CompositeScreenProps<
StackScreenProps<RootBottomTabParamList>,
StackScreenProps<RootStackParamList>
> {
  loggedUserId: string | null,
}

const SET_COURSES = 'SET_COURSES';
const RESET_COURSES = 'RESET_COURSES';
type CourseStateType = {
  onGoing: CourseType[],
  achieved: CourseType[]
};
type CourseActionType = { type: typeof SET_COURSES, payload: CourseType[] } | { type: typeof RESET_COURSES };

const courseReducer = (state: CourseStateType, action: CourseActionType) => {
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

const renderNextStepsItem = (step: NextSlotsStepType) => <NextStepCell nextSlotsStep={step} mode={LEARNER} />;

const LearnerCourses = ({ loggedUserId }: LearnerCoursesProps) => {
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
      fetchData();
    }
  }, [loggedUserId, isFocused, getCourses, getElearningDraftSubPrograms]);

  const onPressProgramCell = () => {
    throw new Error('test error');
  };

  const renderCourseItem = (course: CourseType) => <ProgramCell program={get(course, 'subProgram.program') || {}}
    progress={getCourseProgress(course)} onPress={() => onPressProgramCell()} misc={get(course, 'misc')}
    theoreticalDuration={getTheoreticalDuration(getElearningSteps(get(course, 'subProgram.steps')))}/>;

  const renderSubProgramItem = (subProgram: SubProgramWithProgramType) => <ProgramCell program={subProgram.program}
    theoreticalDuration={getTheoreticalDuration(getElearningSteps(subProgram.steps))}
    onPress={() => onPressProgramCell()} />;

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

const mapStateToProps = (state: StateType) => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(LearnerCourses);
