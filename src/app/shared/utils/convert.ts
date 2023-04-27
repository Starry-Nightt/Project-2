import * as moment from 'moment';
import { Moment } from 'moment';

export const MomentToString = (moment: Moment) => {
  return moment.format('YYYY-MM-DD');
};

export const StringToMoment = (date: string) => {
  return moment(new Date(date), 'YYYY-MM-DD');
};
