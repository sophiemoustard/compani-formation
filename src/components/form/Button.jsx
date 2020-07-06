import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import variables from '../../styles/variables';

const NiButton = ({ style, caption, onPress, loading }) => {
  return (
    <View style={[styles.container, style, loading ? styles.loading : '']}>
      <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
        { !loading && <Text style={styles.textButton}>{caption}</Text> }
        { loading && <ActivityIndicator style={styles.loading} color="#fff" size="small" />}
      </TouchableOpacity>
    </View>
  );
};

NiButton.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {},
  loading: {
    opacity: 0.6,
  },
  button: {
    backgroundColor: variables.PRIMARY_COLOR,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  textButton: {
    color: 'white',
    marginHorizontal: 10,
  }
});


export default NiButton;
