const {
  SignUpCommand
} = require('@aws-sdk/client-cognito-identity-provider');
const { createHmac } = require('crypto');
const clientCognito = require('../infra/clients/cognito');
const config = require('../infra/config/config');

async function createUser(
  email, password, name, companyName, doc, type, paymentGateway, services
) {
  const hasher = createHmac('sha256', config.COGNIT_SECRET_HASH);
  hasher.update(`${email}${config.COGNITO_CLIENT_ID}`);

  const params = {
    UserPoolId: 'us-west-2_6PypPzrTg',
    ClientId: config.COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    SecretHash: hasher.digest('base64'),
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'name',
        Value: name,
      },
      {
        Name: 'custom:document', 
        Value: doc,
      },
      {
        Name: 'custom:type', 
        Value: type,
      },
      {
        Name: 'custom:company_name', 
        Value: JSON.stringify(companyName),
      },
      {
        Name: 'custom:payment_gateway', 
        Value: JSON.stringify(paymentGateway),
      },
      {
        Name: 'custom:services', 
        Value: JSON.stringify(services),
      }
    ],
  };

  try {
    const command = new SignUpCommand(params);
    const response = await clientCognito.send(command);
    console.log('User created successfully:', response);
    return response
  } catch (error) {
    console.error('Error creating user:', error);
    return error
  }
}

module.exports = createUser;
