module.exports = {
  type: 'oauth2',
  test: {
    url: 'https://api.fiken.no/api/v2/user',
    method: 'GET',
    params: {},
    headers: { Authorization: 'Bearer {{bundle.authData.access_token}}' },
    body: {},
    removeMissingValuesFrom: {},
  },
  oauth2Config: {
    authorizeUrl: {
      method: 'GET',
      url: 'https://fiken.no/oauth/authorize',
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code',
      },
    },
    getAccessToken: {
      source:
        "const options = {\n  url: 'https://fiken.no/oauth/token',\n  method: 'POST',\n  headers: {\n    'content-type': 'application/x-www-form-urlencoded',\n    'accept': 'application/json',\n    'Authorization': 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')\n  },\n  params: {\n\n  },\n  body: {\n    'code': bundle.inputData.code,\n    'grant_type': 'authorization_code',\n    'redirect_uri': bundle.inputData.redirect_uri,\n    'state': bundle.inputData.state\n  }\n}\n\nreturn z.request(options)\n  .then((response) => {\n    response.throwForStatus();\n    const results = response.json;\n\n    // You can do any parsing you need for results here before returning them\n\n    return results;\n  });",
    },
    refreshAccessToken: {
      source:
        "const options = {\n  url: 'https://fiken.no/oauth/token',\n  method: 'POST',\n  headers: {\n    'content-type': 'application/x-www-form-urlencoded',\n    'accept': 'application/json',\n    'Authorization': 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')\n  },\n  params: {\n\n  },\n  body: {\n    'refresh_token': bundle.authData.refresh_token,\n    'grant_type': 'refresh_token'\n  }\n}\n\nreturn z.request(options)\n  .then((response) => {\n    response.throwForStatus();\n    const results = response.json;\n\n    // You can do any parsing you need for results here before returning them\n\n    return results;\n  });",
    },
    autoRefresh: true,
  },
  connectionLabel: '{{bundle.inputData.name}}',
};
