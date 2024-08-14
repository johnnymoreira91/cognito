const { UpdateUserAttributesCommand } = require("@aws-sdk/client-cognito-identity-provider");
const clientCognito = require("../infra/clients/cognito");

async function updateUserAttributes(authToken, attributes) {
  const userAttributes = Object.keys(attributes).map((key) => ({
    Name: key,
    Value: attributes[key],
  }));

  const params = {
    AccessToken: authToken,
    UserAttributes: userAttributes,
  };

  try {
    const command = new UpdateUserAttributesCommand(params);
    const response = await clientCognito.send(command);
    console.log("User attributes updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating user attributes:", error);
    return error;
  }
}

module.exports = updateUserAttributes;