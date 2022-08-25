import { Settings, DateTime, DateTimeUnit, ToRelativeUnit, DurationObjectUnits } from 'luxon';
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/fr';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/fr';
import '@formatjs/intl-datetimeformat/add-all-tz';

Settings.defaultLocale = 'fr';
Settings.defaultZone = 'Europe/Paris';
Settings.throwOnInvalid = true;

export { DateTime, DateTimeUnit, ToRelativeUnit, DurationObjectUnits };
