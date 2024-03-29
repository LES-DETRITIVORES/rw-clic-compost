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

export const createPerson = async ({ input }) => {
  const apiInstance = new pipedrive.PersonsApi();
  input.email = [{value: input.email, primary:true, label:"Travail"}]
  input.phone = [{value: input.phone, primary:true, label:"Travail"}]
  let opts = pipedrive.NewPerson.constructFromObject(input);
  const person = await apiInstance.addPerson(opts);

  return {
    id : person.data.id
  }
}

export const createNote = async ({ input }) => {
  const apiInstance = new pipedrive.NotesApi();
  let opts = pipedrive.AddNoteRequest.constructFromObject(input)
  const note = await apiInstance.addNote(opts);

  return {
    id : note.data.id
  }
}
