import { format } from 'date-fns';

import { UTC_TIME_FORMAT } from 'src/constants';

export const utcTime = (date: string | Date) => format(new Date(date), UTC_TIME_FORMAT);
