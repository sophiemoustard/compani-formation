import { Audio } from 'expo-av';

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatPhone = phoneNumber => (phoneNumber
  ? phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5')
  : '');

export const formatPhoneForPayload = phoneNumber => (phoneNumber
  ? phoneNumber.replace(/[\s\-.]/g, '')
  : '');

export const formatWordToPlural = (items, text) => (items.length > 1
  ? `${items.length} ${text}s`
  : `${items.length} ${text}`);

export const capitalizeFirstLetter = s => `${s.charAt(0).toUpperCase()}${s.substr(1)}`;

export const quizJingle = async (isGoodAnswer) => {
  if (isGoodAnswer) {
    const { sound } = await Audio.Sound.createAsync(require('../../../assets/sounds/good-answer.mp3'));
    await sound.playAsync();
  } else {
    const { sound } = await Audio.Sound.createAsync(require('../../../assets/sounds/wrong-answer.mp3'));
    await sound.playAsync();
  }
};

export const achievementJingle = async () => {
  const { sound } = await Audio.Sound.createAsync(require('../../../assets/sounds/ended-activity.mp3'));
  await sound.playAsync();
};
