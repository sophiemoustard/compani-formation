import React, { useState } from 'react';
import { View, Text, FlatList, Linking, TouchableOpacity } from 'react-native';
import { CourseSlotType } from '../../../types/CourseSlotType';
import moment from '../../../core/helpers/moment';
import OnSiteHoursDisplay from '../OnSiteHoursDisplay';
import styles from './style';

interface OnSiteInfoItemProps {
  info: { slots: Array<CourseSlotType> },
}

const OnSiteInfoItem = ({ info }: OnSiteInfoItemProps) => {
  const [address] = useState(info?.slots[0]?.address?.fullAddress);

  const openMaps = async add => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${add}`);

  const hoursItem = slot => <OnSiteHoursDisplay startDate={slot.startDate} endDate={slot.endDate} />;

  return (
    <View>
      <Text style={styles.date}>{moment(info.slots[0].startDate).format('dddd Do MMMM')}</Text>
      <FlatList horizontal ItemSeparatorComponent={() => <View style={styles.separator} />} data={info.slots}
        keyExtractor={item => item._id} renderItem={({ item }) => hoursItem(item)} />
      {address && (
        <TouchableOpacity onPress={() => openMaps(address)}>
          <Text style={styles.address}>{address}</Text>
        </TouchableOpacity>)}
    </View>
  );
};

export default OnSiteInfoItem;
