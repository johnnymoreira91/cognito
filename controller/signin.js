
const { InitiateAuthCommand } = require('@aws-sdk/client-cognito-identity-provider');
const { createHmac } = require('crypto');
const clientCognito = require('../infra/clients/cognito');
const config = require('../infra/config/config');


const loginUser = async (email, password) => {
  const hasher = createHmac('sha256', config.COGNIT_SECRET_HASH);
  hasher.update(`${email}${config.COGNITO_CLIENT_ID}`);
  try {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: config.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: hasher.digest('base64'),
      },
    });

    const response = await clientCognito.send(command);
    console.log('Authentication Result:', response.AuthenticationResult);
    return response.AuthenticationResult;
  } catch (error) {
    console.error(error);
    return false
  }
};

module.exports = loginUser;
