import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Image } from 'react-native';
import moment from '../../../core/helpers/moment';
import About from '../../../components/About';
import styles from './styles';
import { capitalize } from '../../../core/helpers/utils';

interface BlendedAboutProps {
  route: { params: { course } },
  navigation: {
    goBack: () => {},
  },
}

const BlendedAbout = ({ route, navigation }: BlendedAboutProps) => {
  const { course } = route.params;
  const program = course.subProgram?.program || null;
  const dates: Date[] = course.slots.length
    ? course.slots.map(slot => slot.endDate).sort((a, b) => moment(a).diff(b, 'days'))
    : [];
  const [formattedDates, setFormattedDates] = useState<Array<string>>([]);
  const [trainerPictureSource, setTrainerPictureSource] = useState(
    require('../../../../assets/images/default_avatar.png')
  );
  const [contactPictureSource, setContactPictureSource] = useState(
    require('../../../../assets/images/default_avatar.png')
  );

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
    if (course.trainer.picture?.link) setTrainerPictureSource({ uri: course.trainer.picture.link });
    if (course.contact.picture?.link) setContactPictureSource({ uri: course.contact.picture.link });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => navigation.goBack();

  return program && (
    <ScrollView>
      <About program={program} onPress={goBack}>
        {course.slots &&
          <>
            <Text style={styles.sectionTitle}>Dates de formation</Text>
            <FlatList data={formattedDates} keyExtractor={(item, idx) => `${item}${idx}`}
              renderItem={({ item }) => <Text style={styles.sectionContent}>- {item}</Text>} />
            <View style={styles.sectionDelimiter} />
          </>}
        <Text style={styles.sectionTitle}>Intervenant</Text>
        <View style={styles.subSectionContainer}>
          <Image style={styles.trainerPicture} source={trainerPictureSource} />
          <Text style={styles.subSectionTitle}>
            {course.trainer.identity.firstname} {course.trainer.identity.lastname}
          </Text>
          {course.trainer.biography && <Text style={styles.sectionContent}>{course.trainer.biography}</Text>}
        </View>
        <View style={styles.sectionDelimiter} />
        <Text style={styles.sectionTitle}>Votre contact pour la formation</Text>
        <View style={styles.subSectionContainer}>
          <Image style={styles.trainerPicture} source={contactPictureSource} />
          <View>
            <Text style={styles.subSectionTitle}>{course.contact.name}</Text>
            <Text style={styles.contactContent}>{course.contact.phone}</Text>
            <Text style={styles.contactContent}>{course.contact.email}</Text>
          </View>
          {course.trainer.biography && <Text style={styles.sectionContent}>{course.trainer.biography}</Text>}
        </View>
      </About>
    </ScrollView>
  );
};

export default BlendedAbout;
