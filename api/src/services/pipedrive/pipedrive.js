const pipedrive = require('pipedrive');

const defaultClient = pipedrive.ApiClient.instance;
// Configure API key authorization: apiToken
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = process.env.PIPEDRIVE_TOKEN;

export const createDeal = async ({ input }) => {
  const apiInstance = new pipedrive.DealsApi();
  let opts = pipedrive.NewDeal.constructFromObject({
    title: input.title,
    value: "10",
    orgId: "5734",
    pipelineId : "8",
    stageId : "2"
  });
  const deal = await apiInstance.addDeal(opts);

  return {
    id : deal.data.id
  }
}
