import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-display';
import get from 'lodash/get';
import moment from '../../../core/helpers/moment';
import About from '../../../components/About';
import styles from './styles';
import { capitalize, formatIdentity } from '../../../core/helpers/utils';
import { markdownStyle } from '../../../styles/common';
import InternalRulesModal from '../../../components/InternalRulesModal';

interface BlendedAboutProps {
  route: { params: { course } },
  navigation: {
    goBack: () => {},
  },
}

const BlendedAbout = ({ route, navigation }: BlendedAboutProps) => {
  const { course } = route.params;
  const program = course.subProgram?.program || null;
  const [dates, setDates] = useState<Array<Date>>([]);
  const [formattedDates, setFormattedDates] = useState<Array<string>>([]);
  const [trainerPictureSource, setTrainerPictureSource] = useState(
    require('../../../../assets/images/default_avatar.png')
  );
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setDates(course.slots.length
      ? course.slots.map(slot => slot.startDate).sort((a, b) => moment(a).diff(b, 'days'))
      : []);
  }, [course]);

  useEffect(() => {
    if (dates) {
      const dateFormat = 'DD/MM/YYY';
      const slotsDates = [...new Set(dates.map(date => moment(date).format(dateFormat)))];
      setFormattedDates(slotsDates.map((date) => {
        const dayOfWeek = capitalize(moment(date, dateFormat).format('ddd'));
        const dayOfMonth = capitalize(moment(date, dateFormat).format('D'));
        const month = capitalize(moment(date, dateFormat).format('MMM'));
        const year = capitalize(moment(date, dateFormat).format('YYYY'));
        return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
      }));
    }
    if (get(course, 'trainer.picture.link')) setTrainerPictureSource({ uri: course.trainer.picture.link });
  }, [dates, course]);

  const goBack = () => navigation.goBack();

  return program && (
    <About program={program} onPress={goBack}>
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
          <Text style={styles.sectionTitle}>Intervenant</Text>
          <View style={styles.subSectionContainer}>
            <Image style={styles.trainerPicture} source={trainerPictureSource} />
            <Text style={styles.subSectionTitle}>{formatIdentity(course.trainer.identity, 'FL')}</Text>
          </View>
          {!!course.trainer.biography && <Text style={styles.sectionContent}>{course.trainer.biography}</Text>}
        </>}
        {!!course.contact?.name && <>
          <View style={styles.sectionDelimiter} />
          <Text style={styles.sectionTitle}>Votre contact pour la formation</Text>
          <Text style={styles.subSectionTitle}>{course.contact.name}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${course.contact.phone}`)}>
            <Text style={styles.contactContent}>{course.contact.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${course.contact.email}`)} >
            <Text style={styles.contactContent}>{course.contact.email}</Text>
          </TouchableOpacity>
        </>}
      </View>
      <TouchableOpacity style={styles.internalRulesContainer} onPress={() => setIsOpenModal(true)}>
        <Text style={styles.internalRules}>RÈGLEMENT INTÉRIEUR</Text>
      </TouchableOpacity>
      <InternalRulesModal visible={isOpenModal} onRequestClose={() => setIsOpenModal(false)} />
    </About>
  );
};

export default BlendedAbout;
