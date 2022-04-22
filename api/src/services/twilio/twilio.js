const TW_TEST_ACCOUNT = 'AC724edcdd87a985d60b049f9027063ff7'; 
const TW_TEST_TOKEN = '6953660954e3232066fe260151cdd0bd'; 
const twilio = require('twilio')(TW_TEST_ACCOUNT, TW_TEST_TOKEN); 

export const sendSMS = async ({ query }) => {
 
  const message = await twilio.messages.create(
    {
      body: query,
      from: '+12077055921',
      to: '+33672143657' 
    })

  return {
    query,
    id : message.sid
  }
}