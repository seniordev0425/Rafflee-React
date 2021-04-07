import React from 'react'
import { Container } from 'reactstrap'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from './CheckoutForm'

import "./styles.css"

const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function PaymentLayout() {

  return (
    <Container className="min-height-container mt-5">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
}

export default PaymentLayout