import { format } from 'date-fns';

export const getMonthsBetween = (start, end, step = 1) => {
  const arr = [];
  for (let dt = new Date(start); dt <= new Date(end); dt.setMonth(dt.getMonth() + step)) {
    arr.push(new Date(dt));
  }
  return arr;
};

export const formatDate = (date = new Date(), format = 'dd MMM YYYY') => format(new Date(date), format);
