import { patientAxios } from './AxiosConfig';


export const successfulPayment = (order) => {
      patientAxios.post('/order', { order })
      .catch((error) => {
        console.log('Error in placing the order', error);
      });
      return '/patient/pages/orders';
};