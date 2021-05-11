import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, TouchableOpacity } from 'react-native';
import get from 'lodash/get';
import { CourseSlotType } from '../../../types/CourseSlotType';
import moment from '../../../core/helpers/moment';
import OnSiteHoursDisplay from '../OnSiteHoursDisplay';
import styles from './styles';

interface OnSiteInfoItemProps {
  info: { slots: Array<CourseSlotType> },
}

const openMaps = async add => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${add}`);

const hoursItem = slot => <OnSiteHoursDisplay startDate={slot.startDate} endDate={slot.endDate} />;

const OnSiteInfoItem = ({ info }: OnSiteInfoItemProps) => {
  const [address, setAddress] = useState<string>('');

  useEffect(() => { setAddress(get(info, 'slots[0].address.fullAddress') || ''); }, [info]);

  return (
    <>
      <Text style={styles.date}>{moment(info.slots[0].startDate).format('dddd Do MMMM')}</Text>
      <FlatList horizontal ItemSeparatorComponent={() => <View style={styles.separator} />} data={info.slots}
        keyExtractor={item => item._id} renderItem={({ item }) => hoursItem(item)} />
      {!!address && (
        <TouchableOpacity onPress={() => openMaps(address)}>
          <Text style={styles.address}>{address}</Text>
        </TouchableOpacity>)}
    </>
  );
};

export default OnSiteInfoItem;
