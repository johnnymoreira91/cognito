const {
  CognitoIdentityProviderClient
} = require('@aws-sdk/client-cognito-identity-provider');
const config = require('../config/config');

const cognitoClient = new CognitoIdentityProviderClient({ 
  region: 'us-west-2',
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
  }
 });

module.exports = cognitoClient;

