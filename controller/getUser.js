const { GetUserCommand } = require('@aws-sdk/client-cognito-identity-provider');
// const config = require('../infra/config/config');
const clientCognito = require('../infra/clients/cognito');

const getUser = async (accessToken) => {
  try {
    const command = new GetUserCommand({
      AccessToken: accessToken,
    });

    const response = await clientCognito.send(command);
    console.log('User Attributes:', response.UserAttributes);

    const userAttributes = response.UserAttributes;
    const obj = {}
    userAttributes.forEach((attr) => {
      obj[attr.Name.replace('custom:', '')] = attr.Value;
      console.log(`${attr.Name}: ${attr.Value}`);
    });

    obj?.company_name && (obj.company_name = JSON.parse(obj.company_name));
    obj?.payment_gateway && (obj.payment_gateway = JSON.parse(obj.payment_gateway));
    obj?.services && (obj.services = JSON.parse(obj.services));
    return obj
  } catch (error) {
    console.error('Error getting user:', error);
    return error
  }
};

module.exports = getUser;
