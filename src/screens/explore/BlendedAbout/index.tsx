import { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationType';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import { ascendingSort } from '../../../core/helpers/dates/utils';
import About from '../../../components/About';
import styles from './styles';
import { capitalize, formatIdentity } from '../../../core/helpers/utils';
import commonStyles, { markdownStyle } from '../../../styles/common';
import InternalRulesModal from '../../../components/InternalRulesModal';
import ContactInfoContainer from '../../../components/ContactInfoContainer';
import {
  LEARNER,
  DAY_OF_WEEK_SHORT,
  DAY_OF_MONTH,
  MONTH_SHORT,
  YEAR,
  LONG_FIRSTNAME_LONG_LASTNAME,
} from '../../../core/data/constants';

interface BlendedAboutProps extends StackScreenProps<RootStackParamList, 'BlendedAbout'> {}

const formatDate = (date: Date) => {
  const dayOfWeek = capitalize(CompaniDate(date).format(DAY_OF_WEEK_SHORT));
  const dayOfMonth = capitalize(CompaniDate(date).format(DAY_OF_MONTH));
  const month = capitalize(CompaniDate(date).format(MONTH_SHORT));
  const year = capitalize(CompaniDate(date).format(YEAR));
  return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
};

const BlendedAbout = ({ route, navigation }: BlendedAboutProps) => {
  const { course, mode } = route.params;
  const program = course.subProgram?.program || null;
  const [trainerPictureSource, setTrainerPictureSource] = useState(
    require('../../../../assets/images/default_avatar.webp')
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
            <View style={commonStyles.sectionDelimiter} />
            <Text style={styles.sectionTitle}>Dates de formation</Text>
            {formattedDates.map((item, idx) => <View key={idx}>
              <Markdown style={markdownStyle(styles.sectionContent)}>{`- ${item}`}</Markdown>
            </View>)}
          </>}
        {!!course.trainer && <>
          <View style={commonStyles.sectionDelimiter} />
          <Text style={styles.sectionTitle}>Intervenant(e)</Text>
          <View style={styles.subSectionContainer}>
            <Image style={styles.trainerPicture} source={trainerPictureSource} />
            <Text style={styles.subSectionTitle}>
              {formatIdentity(course.trainer.identity, LONG_FIRSTNAME_LONG_LASTNAME)}
            </Text>
          </View>
          {!!course.trainer.biography && <Text style={styles.sectionContent}>{course.trainer.biography}</Text>}
        </>}
        {!!course.contact?.identity && <>
          <View style={commonStyles.sectionDelimiter} />
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

export default BlendedAbout;
