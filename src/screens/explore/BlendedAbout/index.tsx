import { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationType';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import About from '../../../components/About';
import styles from './styles';
import { capitalize, formatIdentity, formatQuantity } from '../../../core/helpers/utils';
import commonStyles, { markdownStyle } from '../../../styles/common';
import InternalRulesModal from '../../../components/InternalRulesModal';
import ContactInfoContainer from '../../../components/ContactInfoContainer';
import { DAY_D_MONTH_YEAR, LEARNER, LONG_FIRSTNAME_LONG_LASTNAME } from '../../../core/data/constants';
import { TrainerType } from '../../../types/CourseTypes';

interface BlendedAboutProps extends StackScreenProps<RootStackParamList, 'BlendedAbout'> {}

const BlendedAbout = ({ route, navigation }: BlendedAboutProps) => {
  const { course, mode } = route.params;
  const program = course.subProgram?.program || null;
  const [trainerPictureSource, setTrainerPictureSource] = useState(
    require('../../../../assets/images/default_avatar.webp')
  );
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const formattedDates = useMemo(() => {
    if (!course.slots.length) return [];

    const formattedSlots = course.slots.map(slot => capitalize(CompaniDate(slot.startDate).format(DAY_D_MONTH_YEAR)));

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
            <FlatList data={formattedDates} scrollEnabled={false}
              renderItem={({ item }) => <Markdown style={markdownStyle(styles.sectionContent)}>{`- ${item}`}</Markdown>}
            />
          </>}
        {!!course.trainers.length && <>
          <View style={commonStyles.sectionDelimiter} />
          <Text style={styles.sectionTitle}>
            {formatQuantity('Intervenant·e', course.trainers.length, '·s', false)}
          </Text>
          {course.trainers.map((trainer: TrainerType) =>
            <>
              <View style={styles.subSectionContainer}>
                <Image style={styles.trainerPicture} source={trainerPictureSource} />
                <Text style={styles.subSectionTitle}>
                  {formatIdentity(trainer.identity, LONG_FIRSTNAME_LONG_LASTNAME)}
                </Text>
              </View>
              {!!trainer.biography && <Text style={styles.sectionContent}>{trainer.biography}</Text>}
            </>)}
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
