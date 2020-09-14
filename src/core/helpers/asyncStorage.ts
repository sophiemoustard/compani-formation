import { AsyncStorage } from 'react-native';
import moment from './moment';

const isTokenValid = (token, expiryDate) => !!token && moment().isBefore(expiryDate);

const getAlenviToken = async () => ({
  alenviToken: await AsyncStorage.getItem('alenvi_token'),
  alenviTokenExpiryDate: await AsyncStorage.getItem('alenvi_token_expiry_date'),
});

const setAlenviToken = async (token) => {
  await AsyncStorage.setItem('alenvi_token', token);
  await AsyncStorage.setItem('alenvi_token_expiry_date', moment().endOf('d').add(1, 'day').toISOString());
};

const removeAlenviToken = async () => {
  await AsyncStorage.removeItem('alenvi_token');
  await AsyncStorage.removeItem('alenvi_token_expiry_date');
};

const getRefreshToken = async () => ({
  refreshToken: await AsyncStorage.getItem('refresh_token'),
  refreshTokenExpiryDate: await AsyncStorage.getItem('refresh_token_expiry_date'),
});

const setRefreshToken = async (refreshToken) => {
  await AsyncStorage.setItem('refresh_token', refreshToken);
  await AsyncStorage.setItem('refresh_token_expiry_date', moment().endOf('d').add(1, 'year').toISOString());
};

const removeRefreshToken = async () => {
  await AsyncStorage.removeItem('refresh_token');
  await AsyncStorage.removeItem('refresh_token_expiry_date');
};

const getUserId = async () => AsyncStorage.getItem('user_id');

const setUserId = async id => AsyncStorage.setItem('user_id', id);

const removeUserId = async () => AsyncStorage.removeItem('user_id');

export default {
  isTokenValid,
  getAlenviToken,
  setAlenviToken,
  removeAlenviToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  getUserId,
  setUserId,
  removeUserId,
};
