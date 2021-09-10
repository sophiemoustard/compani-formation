import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking, TouchableOpacity } from 'react-native';
import get from 'lodash/get';
import { SlotType } from '../../../types/CourseTypes';
import companiDate from '../../../core/helpers/dates';
import OnSiteHoursDisplay from '../OnSiteHoursDisplay';
import styles from './styles';

type OnSiteInfoItemProps = {
  slots: SlotType[],
}

const openMaps = async add => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${add}`);

const hoursItem = slot => <OnSiteHoursDisplay startDate={slot.startDate} endDate={slot.endDate} />;

const OnSiteInfoItem = ({ slots }: OnSiteInfoItemProps) => {
  const [address, setAddress] = useState<string>('');

  useEffect(() => { setAddress(get(slots[0], 'address.fullAddress') || ''); }, [slots]);

  return (
    <>
      <Text style={styles.date}>{companiDate(slots[0].startDate).format('cccc d LLLL')}</Text>
      <FlatList horizontal ItemSeparatorComponent={() => <View style={styles.separator} />} data={slots}
        keyExtractor={item => item._id} renderItem={({ item }) => hoursItem(item)} />
      {!!address && (
        <TouchableOpacity onPress={() => openMaps(address)}>
          <Text style={styles.address}>{address}</Text>
        </TouchableOpacity>)}
    </>
  );
};

export default OnSiteInfoItem;
