import axios from 'axios';
import * as admin from 'firebase-admin';
import { TraceLogger } from '../decorators';

export const sendNotificationsToTokenArray = async (
  tokenArray: string[],
  payload: any,
  options: any,
) => {
  try {
    for (const token of tokenArray) {
      const failedTokens = [];
      if (token) {
        await axios
          .post(
            'https://fcm.googleapis.com/fcm/send',
            {
              to: token,
              content_available: true,
              mutable_content: true,
              data: payload?.data,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization:
                  'key=AAAAXztfFE0:APA91bE5rpWsnQEQcz0gao2SEi2rIODOZjo_PGnXMgOCWQEchhFOzHyVn8OKPETlh64RBfcBcQDIR4wsGWeyoID4KrDyZJQ8aVlApcT6LMbNzDdiGfz7zFDnUmDAN5aJfK3bb4XX-rea',
              },
            },
          )
          .catch((err) => {
            console.log('Error al enviar a token', err);
            failedTokens.push(token);
          });
      }
      if (failedTokens.length > 0)
        console.log('Tokens fallados: ' + failedTokens);
    }
  } catch (error) {
    console.log('error ctm', error);
  }
};
