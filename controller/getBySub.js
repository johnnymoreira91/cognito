const { AdminGetUserCommand } = require("@aws-sdk/client-cognito-identity-provider");
const clientCognito = require('../infra/clients/cognito');
const config = require('../infra/config/config');

async function getUserBySub(sub) {
  const params = {
    UserPoolId: config.COGNITO_USER_POOL_ID, 
    Username: sub,
  };

  try {
    const command = new AdminGetUserCommand(params);
    const response = await clientCognito.send(command);
    console.log("User fetched successfully:", response);
    return response
  } catch (error) {
    console.error("Error fetching user:", error);
    return error
  }
}

module.exports = getUserBySub;
