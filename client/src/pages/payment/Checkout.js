import { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { paymentStatus , paymentElementOptions } from '../../utils/PaymentUtils';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';



export default function CheckoutForm({ item }) {

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);


  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      const deserializedItem = queryParams.get('item');
      item = JSON.parse(decodeURIComponent(deserializedItem));
      setMessage(paymentStatus(navigate,paymentIntent.status, item));
    });

  }, [stripe]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const serializedItem = JSON.stringify(item);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/patient/pages/payment?item=${encodeURIComponent(serializedItem)}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
      Swal.fire('error', error.message, 'error');
    } else {
      setMessage('An unexpected error occurred.');
      Swal.fire('error', error.message, 'error');
    }
    setIsLoading(false);
  };

  


  return (
    <form id='payment-form' onSubmit={handleSubmit}>

      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <Button disabled={isLoading || !stripe || !elements} fullWidth variant="contained" onClick={handleSubmit}>
        {'Pay now'}
      </Button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message' style={
        {
          color: 'rgb(105, 115, 134)',
          fontSize: '16px',
          lineHeight: '20px',
          paddingTop: '12px',
          textAlign: 'center',
        }
      }>{message}</div>}
    </form>
  );
}