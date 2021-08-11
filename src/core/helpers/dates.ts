import { Settings } from 'luxon';
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/fr';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/fr';
import CompaniDate from '../classes/CompaniDate';

Settings.defaultLocale = 'fr';

export const companiDate = (...args: any[]) => new CompaniDate(...args);
