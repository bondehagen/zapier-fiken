const authentication = require('./authentication');
const getCompaniesTrigger = require('./triggers/get_companies.js');
const newCustomerTrigger = require('./triggers/new_customer.js');
const testGetCompaniesTrigger = require('./triggers/test_get_companies.js');
const createContactCreate = require('./creates/create_contact.js');
const createInvoiceDraftCreate = require('./creates/create_invoice_draft.js');
const getContactsSearch = require('./searches/get_contacts.js');
const findProductSearch = require('./searches/find_product.js');
const findInvoiceDraftSearch = require('./searches/find_invoice_draft.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  searches: {
    [getContactsSearch.key]: getContactsSearch,
    [findProductSearch.key]: findProductSearch,
    [findInvoiceDraftSearch.key]: findInvoiceDraftSearch,
  },
  triggers: {
    [getCompaniesTrigger.key]: getCompaniesTrigger,
    [newCustomerTrigger.key]: newCustomerTrigger,
    [testGetCompaniesTrigger.key]: testGetCompaniesTrigger,
  },
  creates: {
    [createContactCreate.key]: createContactCreate,
    [createInvoiceDraftCreate.key]: createInvoiceDraftCreate,
  },
  searchOrCreates: {
    get_contacts: {
      key: 'get_contacts',
      display: {
        label: 'Find or Create Contact',
        description: 'Find contacts with the specified name.',
      },
      search: 'get_contacts',
      create: 'create_contact',
    },
  },
};
