"use strict";
//import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
const { CognitoIdentityProviderClient, AdminInitiateAuthCommand } = require("@aws-sdk/client-cognito-identity-provider");

//const cognito = new CognitoIdentityProviderClient({ region: 'us-east-1' });


exports.an_authenticated_user = async () => {
    const userPoolId=process.env.USER_POOL_ID;
    const clientId=process.env.CLIENT_ID;
    const username=process.env.USERNAME;
    const password=process.env.PASSWORD;

    const authParameters = {
        USERNAME: username, // Ensure this is correctly referenced
        PASSWORD: password, // Ensure this is correctly referenced
      };

    try {
        const cognitoClient = new CognitoIdentityProviderClient({ region: 'us-east-1' });
        const params = {
            UserPoolId: userPoolId,
            ClientId: clientId,
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            AuthParameters: {
                "USERNAME":"test",
                "PASSWORD":"anyam_R@5e"
            }
        };
        const command = new AdminInitiateAuthCommand(params);
        return cognitoClient.send(command);
    } catch (err) {
        throw err;
    }
}