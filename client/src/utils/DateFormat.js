import moment from 'moment/moment';
import { DATE_FORAMT } from 'utils/Constants';
export const formatDate = (date) => {
    const momentDate = new moment(date);
    return momentDate.format(DATE_FORAMT);
};




export const getMinDate = (month) => {
    const year= new Date().getFullYear();
    const today = new Date(year, month, 1);
    console.log('min ======== ', today);
    return today;
  };

export const getMaxDate = (month) => {
    const year= new Date().getFullYear();
    const today = new Date(year, month + 1, 0);
    console.log('max ======== ', today);
    return today;
  };
  