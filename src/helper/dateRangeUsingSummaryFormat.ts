import { SaleSummaryType } from '../types';
const moment = require('moment');

export const dateRangeUsingSummaryFormat = (format: SaleSummaryType) => {
  const now = moment();
  switch (format) {
    case 'year': {
      return {
        start: now.startOf('year').toISOString(),
        end: now.endOf('year').toISOString(),
      };
    }
    case 'month': {
      return {
        start: now.startOf('month').toISOString(),
        end: now.endOf('month').toISOString(),
      };
    }
    case 'week': {
      return {
        start: now.clone().weekday(1).toISOString(),
        end: now.clone().weekday(7).toISOString(),
      };
    }
    default: {
      return {
        start: moment(
          now.startOf('day').format('YYYY-MM-DD hh:mm:ss'),
        ).toISOString(),
        end: moment(
          now.endOf('day').format('YYYY-MM-DD hh:mm:ss'),
        ).toISOString(),
      };
    }
  }
};
