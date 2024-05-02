// @ts-nocheck
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/NavigationType';
import Courses from '@/api/courses';
import { getLoggedUserId } from '@/store/main/selectors';
import { ELearningCourseType, ProgramType } from '@/types/CourseTypes';
import About from '@/components/About';
import { LEARNER } from '@/core/data/constants';
import { StateType } from '@/types/store/StoreType';

interface ElearningAboutProps extends StackScreenProps<RootStackParamList, 'ELearningAbout'> {
  loggedUserId: string | null,
  program: ProgramType,
}

const ELearningAbout = ({ loggedUserId, program }: ElearningAboutProps) => {
  const router = useRouter();
  const { isFromCatalog } = useLocalSearchParams();
  const [hasAlreadySubscribed, setHasAlreadySubscribed] = useState(false);
  const [courseId, setCourseId] = useState<string>('');

  useEffect(() => {
    const subProgram = program.subPrograms ? program.subPrograms[0] : null;
    const course = subProgram?.courses ? subProgram.courses[0] : null;
    if (course) {
      setCourseId(course._id);

      const { trainees } = course as ELearningCourseType;
      if (loggedUserId) setHasAlreadySubscribed(trainees?.includes(loggedUserId) || false);
    }
  }, [loggedUserId, program]);

  const goToCourse = () => router.navigate({ pathname: '/Courses/LearnerCourseProfile', params: { courseId } });

  const startActivity = () => {
    const firstActivity = get(program, 'subPrograms[0].steps[0].activities[0]') || null;
    router.replace({ pathname: '/Courses/LearnerCourseProfile', params: { courseId } });
    router.navigate({
      pathname: '/Courses/ActivityCardContainer',
      params: { activityId: firstActivity?._id, profileId: courseId, mode: LEARNER },
    });
  };

  const subscribeAndGoToCourseProfile = async () => {
    try {
      if (!hasAlreadySubscribed) {
        await Courses.registerToELearningCourse(courseId);
        startActivity();
      } else goToCourse();
    } catch (e: any) {
      console.error(e);
    }
  };

  const goBack = () => {
    if (isFromCatalog) router.navigate('Home/Catalog');
    else router.back();
  };

  const buttonCaption = hasAlreadySubscribed ? 'Continuer' : 'Commencer';

  return (
    <About program={program} onPress={subscribeAndGoToCourseProfile} buttonCaption={buttonCaption} goBack={goBack} />
  );
};

const mapStateToProps = (state: StateType) => ({
  loggedUserId: getLoggedUserId(state),
  program: state.program.program,
});

export default connect(mapStateToProps)(ELearningAbout);
