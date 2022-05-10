const stripe = require('stripe')(process.env.STRIPE_TEST_TOKEN);

export const createCustomer = async ({ input }) => {
  const customer = await stripe.customers.create(input);
  return {
    id : customer.id
  }
}

export const createCard = async ({ input }) => {
  const card = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: input.number,
      exp_month: input.exp_month,
      exp_year: input.exp_year,
      cvc: input.cvc
    },
  });

  const paymentAttach = await stripe.paymentMethods.attach(
    card.id,
    {customer: input.customer}
  );

  return {
    id : card.id
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

export const getClientSecret = async ({ query }) => {
  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['sepa_debit'],
    customer: query,
  });

  return {
    secret : setupIntent.client_secret
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
    payment_method: 'pm_1KtHvzDczmPm9BYQ4FcSDx6Y', // SEPA
    receipt_email: 'admin@les-detritivores.co'
  })
  
  return {
    query,
    id: paymentIntent.id,
  }
}