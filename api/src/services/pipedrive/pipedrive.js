const pipedrive = require('pipedrive');

const defaultClient = pipedrive.ApiClient.instance;
// Configure API key authorization: apiToken
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = process.env.PIPEDRIVE_TOKEN;

export const createDeal = async ({ input }) => {
  const apiInstance = new pipedrive.DealsApi();
  let opts = pipedrive.NewDeal.constructFromObject(input);
  const deal = await apiInstance.addDeal(opts);

  return {
    id : deal.data.id
  }
}

export const createOrganization = async ({ input }) => {
  const apiInstance = new pipedrive.OrganizationsApi();
  let opts = pipedrive.NewOrganization.constructFromObject(input);
  const organization = await apiInstance.addOrganization(opts);

  return {
    id : organization.data.id
  }
}
