import { environmentprod } from '../envconfig';

export const environment = {
  "production":true,
  "firebaseConfig":{
    "apiKey":environmentprod.apiKey,
    "authDomain":environmentprod.authDomain,
    "databaseURL":environmentprod.databaseURL,
    "projectId":environmentprod.projectId,
    "storageBucket":environmentprod.storageBucket,
    "messagingSenderId":environmentprod.messagingSenderId,
    "appId":environmentprod.appId,
    "measurementId":environmentprod.measurementId
  }
};
