const perform = (z, bundle) => {
  const options = {
    url: 'https://api.fiken.no/api/v2/companies',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    params: {
      pageSize: '100',
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    return results.map(function (company) {
      company.id = company.name;
      return company;
    });
  });
};

module.exports = {
  operation: { perform: perform, canPaginate: true },
  key: 'test_get_companies',
  noun: 'Companies',
  display: {
    label: 'Test Get Companies',
    description: 'Alex tester om dette funker',
    hidden: true,
    important: false,
  },
};
