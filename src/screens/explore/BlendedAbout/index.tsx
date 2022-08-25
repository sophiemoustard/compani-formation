import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationType';
import companiDate from '../../../core/helpers/dates/companiDates';
import About from '../../../components/About';
import styles from './styles';
import { capitalize, formatIdentity } from '../../../core/helpers/utils';
import { markdownStyle } from '../../../styles/common';
import InternalRulesModal from '../../../components/InternalRulesModal';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';

interface BlendedAboutProps extends StackScreenProps<RootStackParamList, 'BlendedAbout'> {}

const formatDate = (date) => {
  const dayOfWeek = capitalize(companiDate(date).format('ccc'));
  const dayOfMonth = capitalize(companiDate(date).format('d'));
  const month = capitalize(companiDate(date).format('LLL'));
  const year = capitalize(companiDate(date).format('yyyy'));
  return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
};

const BlendedAbout = ({ route, navigation }: BlendedAboutProps) => {
  const { course } = route.params;
  const program = course.subProgram?.program || null;
  const [trainerPictureSource, setTrainerPictureSource] = useState(
    require('../../../../assets/images/default_avatar.png')
  );
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const formattedDates = useMemo(() => {
    if (!course.slots.length) return [];

    const formattedSlots = course.slots
      .sort((a, b) => companiDate(a.startDate).diff(b.startDate, 'days'))
      .map(slot => formatDate(slot.startDate));

    return [...new Set(formattedSlots)];
  }, [course.slots]);

  useEffect(() => {
    if (course?.trainer?.picture?.link) setTrainerPictureSource({ uri: course.trainer.picture.link });
  }, [course?.trainer?.picture?.link]);

  const goToCourse = () => {
    if (course._id) navigation.navigate('CourseProfile', { courseId: course._id });
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
          <Text style={styles.sectionTitle}>Votre contact pour la formation</Text>
          <Text style={styles.subSectionTitle}>{formatIdentity(course.contact.identity, 'FL')}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${course.contact.contact.phone}`)}
            style={styles.contact}>
            <Feather name='phone' size={ICON.MD} color={GREY[600]} />
            <Text style={styles.contactContent}>{course.contact.contact.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${course.contact.local.email}`)}
            style={styles.contact}>
            <Feather name='mail' size={ICON.MD} color={GREY[600]}/>
            <Text style={styles.contactContent}>{course.contact.local.email}</Text>
          </TouchableOpacity>
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
