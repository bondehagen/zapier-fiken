const perform = (z, bundle) => {
  const options = {
    url: 'https://api.fiken.no/api/v2/companies',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    return results.map(function (contact) {
      contact.id = contact.name;
      return contact;
    });
  });
};

module.exports = {
  operation: {
    perform: perform,
    canPaginate: true,
    type: 'polling',
    sample: {
      name: 'Midio AS',
      slug: 'midio-as',
      organizationNumber: '925475874',
      vatType: 'false',
      creationDate: '2020-07-22',
      hasApiAccess: false,
      testCompany: false,
      accountingStartDate: '2020-07-22',
      id: '925475874',
    },
    outputFields: [
      { key: 'name' },
      { key: 'slug' },
      { key: 'organizationNumber' },
      { key: 'vatType' },
      { key: 'creationDate' },
      { key: 'hasApiAccess', type: 'boolean' },
      { key: 'testCompany', type: 'boolean' },
      { key: 'accountingStartDate' },
      { key: 'id' },
    ],
  },
  key: 'get_companies',
  noun: 'Company',
  display: {
    label: 'Get Companies',
    description:
      'Returns all companies from the system that the user has access to',
    hidden: true,
    important: false,
  },
};
