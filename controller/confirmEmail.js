const { ConfirmSignUpCommand } = require('@aws-sdk/client-cognito-identity-provider');
const clientCognito = require('../infra/clients/cognito');
const config = require('../infra/config/config');
const { createHmac } = require('crypto');

async function verifyUser(email, confirmationCode) {
  const hasher = createHmac('sha256', config.COGNIT_SECRET_HASH);
  hasher.update(`${email}${config.COGNITO_CLIENT_ID}`);

  const params = {
    ClientId: config.COGNITO_CLIENT_ID,
    Username: email,
    ConfirmationCode: confirmationCode,
    SecretHash: hasher.digest('base64'),
  };

  try {
    const command = new ConfirmSignUpCommand(params);
    const response = await clientCognito.send(command);
    console.log("User confirmed successfully:", response);
    return response;
  } catch (error) {
    console.error("Error confirming user:", error);
    return false;
  }
}

module.exports = verifyUser;
