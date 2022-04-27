const SK_TEST_TOKEN = 'sk_test_51IvKaADczmPm9BYQwm3wIcB02BUdMsACq8jxlo8UaDL5EE8hbcu2TDdP7qVdSAY6juszXMIopGlpmA3wiALaG3cn00ZOj5L93b'
const stripe = require('stripe')(SK_TEST_TOKEN);
import {loadStripe} from '@stripe/stripe-js';

export const addCustomer = async ({ query }) => {
  const customer = await stripe.customers.create({
    description: query,
    email: 'admin@les-detritivores.co'
  });
  return {
    query,
    id : customer.id
  }
}

export const addPaymentMethod = async ({ query }) => {

  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 4,
      exp_year: 2023,
      cvc: '314',
    },
  });

  const paymentAttach = await stripe.paymentMethods.attach(
    paymentMethod.id,
    {customer: 'cus_LY4LysEO2dG6NP'}
  );

  return {
    query,
    id : paymentMethod.id
  }
}

export const addSEPAMethod = async ({ name, email, iban }) => {

  const paymentMethod = await stripe.paymentMethods.create({
    type: 'sepa_debit',
    sepa_debit: {iban : iban},
    billing_details: {
      name: name,
      email: email
    }
  });
  
  const paymentAttach = await stripe.paymentMethods.attach(
    paymentMethod.id,
    {customer: 'cus_LY4LysEO2dG6NP'}
  );
  
  return {
    name: name,
    email: email,
    iban: iban,
    id : paymentMethod.id
  }
}

export const addSEPAMethod_V2 = async ({ name, email, iban }) => {
  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['sepa_debit'],
    customer: 'cus_LY4LysEO2dG6NP',
  });
  const clientSecret = setupIntent.client_secret;

  return {
    name: name,
    email: email,
    iban: iban,
    id : setupIntent.client_secret
  }
}

export const addPayment = async ({ query }) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: query*100,
    currency: "eur",
    confirm: true,
    customer: 'cus_LY4LysEO2dG6NP',
    payment_method_types: ['card', 'sepa_debit'],
    //payment_method: 'pm_1KqyWNDczmPm9BYQubUV4LZn', // CARD
    payment_method: 'pm_1KtF2PDczmPm9BYQEf6rTGbn', // SEPA
    receipt_email: 'admin@les-detritivores.co'
  })
  
  return {
    query,
    id: paymentIntent.id,
  }
}