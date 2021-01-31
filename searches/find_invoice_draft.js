module.exports = {
  operation: {
    perform: {
      url:
        'https://api.fiken.no/api/v2/companies/{{bundle.inputData.slug}}/invoices/drafts',
      method: 'GET',
      params: {
        slug: '{{bundle.inputData.slug}}',
        orderReference: '{{bundle.inputData.orderReference}}',
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer {{bundle.authData.access_token}}',
        'X-ORDER-REFERENCE': '{{bundle.inputData.orderReference}}',
      },
      body: { orderReference: '{{bundle.inputData.orderReference}}' },
      removeMissingValuesFrom: {},
    },
    inputFields: [
      {
        key: 'slug',
        label: 'Fiken Company',
        type: 'string',
        dynamic: 'get_companies.slug.slug',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'orderReference',
        label: 'Order Reference',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
  },
  key: 'find_invoice_draft',
  noun: 'Invoice Draft',
  display: {
    label: 'Find Invoice Draft',
    description: 'Finds a Fiken Invoice Draft',
    hidden: false,
    important: false,
  },
};
