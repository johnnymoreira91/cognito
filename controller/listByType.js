const { ListUsersCommand } = require("@aws-sdk/client-cognito-identity-provider");
const clientCognito = require('../infra/clients/cognito');
const config = require('../infra/config/config');

async function listUsersByType(type) {
  const params = {
    UserPoolId: config.COGNITO_USER_POOL_ID, 
    Filter: `custom:type = "${type}"`,
  };

  try {
    const command = new ListUsersCommand(params);
    const response = await clientCognito.send(command);
    console.log("Users fetched successfully:", response.Users);
    return response
  } catch (error) {
    console.error("Error fetching users:", error);
    return error
  }
}

module.exports = listUsersByType;
