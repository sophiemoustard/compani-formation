import { SHORT_DURATION_H_MM, LONG_DURATION_H_MM } from '../../data/constants';
import { Duration } from './luxon';

const DURATION_HOURS = 'h\'h\'';
const DURATION_MINUTES = 'm\'min\'';

type DurationTypes = CompaniDurationType | string;

type displayFormat = typeof SHORT_DURATION_H_MM | typeof LONG_DURATION_H_MM;

type CompaniDurationType = {
  _getDuration: Duration,
  format: (template: displayFormat) => string,
  asDays: () => Number,
  toISO: () => string,
  isEqual: (miscTypeOtherDuration: DurationTypes) => Boolean,
  add: (miscTypeOtherDuration: DurationTypes) => CompaniDurationType,
}

const CompaniDurationFactory = (inputDuration: Duration): CompaniDurationType => {
  const _duration = inputDuration;

  return {
    // GETTER
    get _getDuration() {
      return _duration;
    },

    // DISPLAY
    format(template: displayFormat) {
      const shiftedDuration = _duration.shiftTo('hours', 'minutes', 'seconds');
      const minutes = shiftedDuration.get('minutes');
      const hours = shiftedDuration.get('hours');

      if (template === SHORT_DURATION_H_MM) {
        if (minutes === 0) return _duration.toFormat(DURATION_HOURS);

        return _duration.toFormat(SHORT_DURATION_H_MM);
      }
      if (template === LONG_DURATION_H_MM) {
        if (hours === 0) return _duration.toFormat(DURATION_MINUTES);
        if (minutes === 0) return _duration.toFormat(DURATION_HOURS);

        return _duration.toFormat(LONG_DURATION_H_MM);
      }
      throw Error('Invalid argument: expected specific format');
    },

    asDays() {
      return _duration.as('days');
    },

    toISO() {
      return _duration.toISO();
    },

    // QUERY
    isEqual(miscTypeOtherDuration) {
      const otherDurationInSeconds = _formatMiscToCompaniDuration(miscTypeOtherDuration).shiftTo('seconds');
      const durationInSeconds = _duration.shiftTo('seconds');

      return durationInSeconds.equals(otherDurationInSeconds);
    },

    // MANIPULATE
    add(miscTypeOtherDuration: DurationTypes) {
      const otherDuration = _formatMiscToCompaniDuration(miscTypeOtherDuration);

      return CompaniDurationFactory(_duration.plus(otherDuration));
    },
  };
};

type CompaniDurationArgs = [] | [DurationTypes];

const _formatMiscToCompaniDuration = (...args: CompaniDurationArgs) => {
  if (args.length === 0) return Duration.fromISO('PT0S');

  if (args.length === 1) {
    if (typeof args[0] === 'string') return Duration.fromISO(args[0]);

    if (args[0] instanceof Object) {
      if (args[0]._getDuration && args[0]._getDuration instanceof Duration) return args[0]._getDuration;
    }
  }
  return Duration.invalid('wrong arguments');
};

export default (...args: CompaniDurationArgs) => CompaniDurationFactory(_formatMiscToCompaniDuration(...args));
