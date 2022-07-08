import * as admin from 'firebase-admin';

export const sendNotificationsToTokenArray = async (
  tokenArray: string[],
  payload: any,
  options: any,
) => {
  try {
    for (const token of tokenArray) {
      const failedTokens = [];
      if(token){
        await admin
          .messaging()
          .sendToDevice(token, payload, options)
          .then((response) => {
            if (response.failureCount > 0) {
              failedTokens.push(token);
            }
          });
      }
      if (failedTokens.length > 0)
        console.log('Tokens fallados: ' + failedTokens);
    }
  } catch (error) {
    console.log('error ctm', error);
  }
};
