import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-display';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationType';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import { ascendingSort } from '../../../core/helpers/dates/utils';
import About from '../../../components/About';
import styles from './styles';
import { capitalize, formatIdentity } from '../../../core/helpers/utils';
import { markdownStyle } from '../../../styles/common';
import InternalRulesModal from '../../../components/InternalRulesModal';
import ContactInfoContainer from '../../../components/ContactInfoContainer';
import { StateType } from '../../../types/store/StoreType';
import { CourseModeType } from '../../../types/store/CourseStoreType';
import { LEARNER } from '../../../core/data/constants';

interface BlendedAboutProps extends StackScreenProps<RootStackParamList, 'BlendedAbout'> {
  mode: CourseModeType,
}

const formatDate = (date) => {
  const dayOfWeek = capitalize(CompaniDate(date).format('ccc'));
  const dayOfMonth = capitalize(CompaniDate(date).format('d'));
  const month = capitalize(CompaniDate(date).format('LLL'));
  const year = capitalize(CompaniDate(date).format('yyyy'));
  return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
};

const BlendedAbout = ({ mode, route, navigation }: BlendedAboutProps) => {
  const { course } = route.params;
  const program = course.subProgram?.program || null;
  const [trainerPictureSource, setTrainerPictureSource] = useState(
    require('../../../../assets/images/default_avatar.png')
  );
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const formattedDates = useMemo(() => {
    if (!course.slots.length) return [];

    const formattedSlots = course.slots
      .sort(ascendingSort('startDate'))
      .map(slot => formatDate(slot.startDate));

    return [...new Set(formattedSlots)];
  }, [course.slots]);

  useEffect(() => {
    if (course?.trainer?.picture?.link) setTrainerPictureSource({ uri: course.trainer.picture.link });
  }, [course?.trainer?.picture?.link]);

  const goToCourse = () => {
    if (course._id) {
      navigation.navigate(mode === LEARNER ? 'LearnerCourseProfile' : 'TrainerCourseProfile', { courseId: course._id });
    }
  };

  return program && (
    <About program={program} onPress={goToCourse}>
      <View style={styles.content}>
        {course.slots.length > 0 &&
          <>
            <View style={styles.sectionDelimiter} />
            <Text style={styles.sectionTitle}>Dates de formation</Text>
            <FlatList data={formattedDates} keyExtractor={(item, idx) => `${item}${idx}`}
              renderItem={({ item }) =>
                <Markdown style={markdownStyle(styles.sectionContent)}>{`- ${item}`}</Markdown>} />
          </>}
        {!!course.trainer && <>
          <View style={styles.sectionDelimiter} />
          <Text style={styles.sectionTitle}>Intervenant(e)</Text>
          <View style={styles.subSectionContainer}>
            <Image style={styles.trainerPicture} source={trainerPictureSource} />
            <Text style={styles.subSectionTitle}>{formatIdentity(course.trainer.identity, 'FL')}</Text>
          </View>
          {!!course.trainer.biography && <Text style={styles.sectionContent}>{course.trainer.biography}</Text>}
        </>}
        {!!course.contact?.identity && <>
          <View style={styles.sectionDelimiter} />
          <ContactInfoContainer contact={course.contact} title={'Votre contact pour la formation'} />
        </>}
      </View>
      <TouchableOpacity style={styles.internalRulesContainer} onPress={() => setIsModalOpened(true)}>
        <Text style={styles.internalRules}>RÈGLEMENT INTÉRIEUR</Text>
      </TouchableOpacity>
      <InternalRulesModal visible={isModalOpened} onRequestClose={() => setIsModalOpened(false)} />
    </About>
  );
};

const mapStateToProps = (state: StateType) => ({ mode: state.courses.mode });

export default connect(mapStateToProps)(BlendedAbout);
