import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, TouchableOpacity } from 'react-native';
import get from 'lodash/get';
import { SlotType } from '../../../types/CourseTypes';
import companiDate from '../../../core/helpers/dates';
import LiveHoursDisplay from '../LiveHoursDisplay';
import styles from './styles';
import { ON_SITE } from '../../../core/data/constants';

type LiveInfoItemProps = {
  slots: SlotType[],
}

const hoursItem = slot => <LiveHoursDisplay startDate={slot.startDate} endDate={slot.endDate} />;

const LiveInfoItem = ({ slots }: LiveInfoItemProps) => {
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    setLocation(slots[0].step.type === ON_SITE
      ? (get(slots[0], 'address.fullAddress') || '')
      : (get(slots[0], 'meetingLink') || ''));
  }, [slots]);

  const openUrl = async add => (slots[0].step.type === ON_SITE
    ? Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${add}`)
    : Linking.openURL(add)
  );

  return (
    <>
      <Text style={styles.date}>{companiDate(slots[0].startDate).format('cccc d LLLL')}</Text>
      <FlatList horizontal ItemSeparatorComponent={() => <View style={styles.separator} />} data={slots}
        keyExtractor={item => item._id} renderItem={({ item }) => hoursItem(item)} />
      {!!location && (
        <TouchableOpacity onPress={() => openUrl(location)}>
          <Text style={styles.location}>{location}</Text>
        </TouchableOpacity>)}
    </>
  );
};

export default LiveInfoItem;
