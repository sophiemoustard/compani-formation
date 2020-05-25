import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NiButton = ({ style, caption, onPress }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.textButton}>{caption}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: '#E2007A',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    marginHorizontal: 10,
  }
});


export default NiButton;
