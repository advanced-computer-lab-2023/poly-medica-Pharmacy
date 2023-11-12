import { patientAxios } from './AxiosConfig';
import Swal from 'sweetalert2';




export const successfulPayment = (order) => {
  patientAxios.post('/order', { order })
    .catch((error) => {
      console.log('Error in placing the order', error);
    });
  return '/patient/pages/orders';
};

export const paymentStatus = (navigate, status, item) => {
  switch (status) {
    case 'succeeded': {
      Swal.fire('success', 'Payment Succeeded', 'success').then(() => {
        const callBackUrl = successfulPayment(item);
        navigate(callBackUrl, { replace: true });
      }
      ).catch((error) => {
        console.log('Error the purchase', error);
      });
      return ('Payment succeeded!');
    }
    case 'processing': {
      return ('Your payment is processing.');
    }
    case 'requires_payment_method': {

      Swal.fire('error', 'failed payment', 'error');
      return ('Your payment was not successful, please try again.');
    }
    default:
      Swal.fire('error', 'Something went wrong.', 'error');
      return ('Something went wrong.');
  }
};

export const paymentElementOptions = {
  layout: {
    type: 'accordion',
    defaultCollapsed: false,
    radios: true,
    spacedAccordionItems: true
  }
};