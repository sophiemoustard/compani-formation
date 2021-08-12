import { Settings } from 'luxon';
import CompaniDate from '../classes/CompaniDate';

Settings.defaultLocale = 'fr';

export const companiDate = (...args: any[]) => new CompaniDate(...args);
