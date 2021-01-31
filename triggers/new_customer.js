const perform = (z, bundle) => {
  const options = {
    url: `https://api.fiken.no/api/v2/companies/${bundle.inputData.slug}/contacts`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      slug: bundle.inputData.slug,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    return results.map(function (customerid) {
      customerid.id = customerid.contactId;
      return customerid;
    });
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'slug',
        type: 'string',
        label: 'Company',
        helpText: 'Select Fiken company',
        dynamic: 'get_companies.slug.slug',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'customer',
        type: 'boolean',
        label: 'Only if Customer?',
        helpText: 'Only run if the contact is a customer',
        default: 'true',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      contactId: 2747365,
      lastModifiedDate: {},
      name: 'Fiken AS',
      email: 'kontakt@fiken.gmail',
      organizationNumber: 913312465,
      customerNumber: 51248,
      customerAccountCode: '1500:20001',
      supplierNumber: 0,
      supplierAccountCode: '2400:20001',
      customer: false,
      supplier: false,
      contactPerson: [
        {
          contactPersonId: 2747365,
          name: 'Betty Boop',
          email: 'bb@gmail.com',
          phoneNumber: 98573564,
          address: {
            streetAddress: 'Karl Johan 34',
            city: 'Oslo',
            postCode: 360,
            country: 'Norway',
          },
        },
      ],
      language: 'Norwegian',
      inactive: true,
      daysUntilInvoicingDueDate: 15,
      address: {
        streetAddress: 'Karl Johan 34',
        city: 'Oslo',
        postCode: 360,
        country: 'Norway',
      },
      groups: ['string'],
    },
    outputFields: [
      { key: 'contactId', type: 'integer' },
      { key: 'name' },
      { key: 'email' },
      { key: 'organizationNumber' },
      { key: 'customerNumber', type: 'integer' },
      { key: 'customerAccountCode' },
      { key: 'supplierNumber' },
      { key: 'supplierAccountCode' },
      { key: 'customer', type: 'boolean' },
      { key: 'supplier', type: 'boolean' },
      { key: 'contactPerson[]contactPersonId' },
      { key: 'contactPerson[]name' },
      { key: 'contactPerson[]email' },
      { key: 'contactPerson[]phoneNumber' },
      { key: 'contactPerson[]address__streetAddress' },
      { key: 'contactPerson[]address__city' },
      { key: 'contactPerson[]address__postCode' },
      { key: 'contactPerson[]address__country' },
      { key: 'language' },
      { key: 'inactive' },
      { key: 'daysUntilInvoicingDueDate' },
      { key: 'address__streetAddress' },
      { key: 'address__city' },
      { key: 'address__postCode' },
      { key: 'address__country' },
      { key: 'groups[]0' },
      { key: 'groups[]1' },
      { key: 'groups[]2' },
      { key: 'groups[]3' },
      { key: 'groups[]4' },
      { key: 'groups[]5' },
    ],
  },
  key: 'new_customer',
  noun: 'Customer',
  display: {
    label: 'New customer',
    description: 'Triggers when new customer is created in Fiken',
    hidden: false,
    important: false,
  },
};
