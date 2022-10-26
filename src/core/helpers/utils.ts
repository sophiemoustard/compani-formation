import { Audio } from 'expo-av';
import BigNumber from 'bignumber.js';
import { STRICTLY_E_LEARNING, LONG_DURATION_H_MM } from '../data/constants';
import CompaniDuration from '../helpers/dates/companiDurations';

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

const loadPlayAndUnloadAudio = async (track) => {
  const { sound } = await Audio.Sound.createAsync(track);

  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate((status) => {
    if (!status.isLoaded || !status.didJustFinish) return;
    sound.unloadAsync();
  });
};

export const quizJingle = async (isGoodAnswer) => {
  const track = isGoodAnswer
    ? require('../../../assets/sounds/good-answer.mp3')
    : require('../../../assets/sounds/wrong-answer.mp3');
  loadPlayAndUnloadAudio(track);
};

export const achievementJingle = async () => {
  const track = require('../../../assets/sounds/ended-activity.mp3');
  loadPlayAndUnloadAudio(track);
};
export const formatIdentity = (identity, format) => {
  if (!identity) return '';
  const formatLower = format.toLowerCase();
  const values: string[] = [];

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
  const durationInSeconds = durationHours * 3600;
  const durationISO = `PT${durationInSeconds}S`;

  return CompaniDuration(durationISO).format(LONG_DURATION_H_MM);
};

export const add = (...nums) => nums.reduce((acc, n) => new BigNumber(acc).plus(n).toNumber(), 0);

export const getTheoreticalHours = steps => (
  steps.length
    ? steps.reduce((acc, value) => add(acc, value.theoreticalHours || 0), 0)
    : 0);
