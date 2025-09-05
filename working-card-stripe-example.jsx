import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(500); // in cents
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!stripe || !elements) return;

    // Step 1: Create PaymentIntent on backend
    const res = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, amount }),
    });

    const { clientSecret } = await res.json();

    // Step 2: Confirm payment using Card Element
    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: { email },
        },
      },
    );

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      setMessage('✅ Payment successful!');
    } else {
      setMessage(`Unexpected status: ${paymentIntent.status}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${amount / 100}
      </button>
      <div>{message}</div>
    </form>
  );
};

export default CheckoutForm;
