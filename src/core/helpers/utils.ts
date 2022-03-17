import { Audio } from 'expo-av';
import { STRICTLY_E_LEARNING } from '../data/constants';

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

export const formatWordToPlural = (items, text) => (items.length > 1 ? `${text}s` : `${text}`);

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
export const formatIdentity = (identity, format) => {
  if (!identity) return '';
  const formatLower = format.toLowerCase();
  const values = [''];

  for (let i = 0; i < format.length; i += 1) {
    let value;
    if (formatLower[i] === 'f') value = (identity.firstname || '').trim();
    else if (formatLower[i] === 'l') value = (identity.lastname || '').trim();

    if (!value) break;

    if (formatLower[i] === format[i]) value = `${value.charAt(0).toUpperCase()}.`;
    values.push(value);
  }

  return values.join(' ');
};
export const getCourseProgress = (course) => {
  if (course.format === STRICTLY_E_LEARNING) return course.progress.eLearning;

  return course.progress.blended;
};

export const formatDuration = (durationHours) => {
  const hours = Math.floor(durationHours);
  const minutes = Math.round((durationHours % 1) * 60);
  if (!hours) return `${minutes}min`;
  if (!minutes) return `${hours}h`;

  return `${hours}h ${minutes.toString().padStart(2, '0')}min`;
};
