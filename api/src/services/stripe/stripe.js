const SK_TEST_TOKEN = 'sk_test_51IvKaADczmPm9BYQwm3wIcB02BUdMsACq8jxlo8UaDL5EE8hbcu2TDdP7qVdSAY6juszXMIopGlpmA3wiALaG3cn00ZOj5L93b'
const stripe = require('stripe')(SK_TEST_TOKEN);

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

export const addPayment = async ({ query }) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: query*100,
    currency: "eur",
    confirm: true,
    customer: 'cus_LY4LysEO2dG6NP',
    payment_method: 'pm_1KqyWNDczmPm9BYQubUV4LZn',
    receipt_email: 'admin@les-detritivores.co'
  })
  
  return {
    query,
    id: paymentIntent.id,
  }
}