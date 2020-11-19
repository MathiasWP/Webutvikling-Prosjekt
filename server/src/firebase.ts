import firebase from 'firebase'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import firebaseAccountCredentials from '../keys/serviceAccount.json';
import firebaseConfig from '../keys/config.json'; 
import * as app from './app.js'; //typescript problem, with importing .ts file, that's why this has to be js.

const serviceAccount = JSON.parse(JSON.stringify(firebaseAccountCredentials)) as admin.ServiceAccount
const config = JSON.parse(JSON.stringify(firebaseConfig));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...config
});

export const adminAuth = admin.auth();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const _firestore = firebase.firestore;
export const webApi = functions.https.onRequest(app)
