import firebase from 'firebase'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import firebaseAccountCredentials from '../keys/serviceAccount.json';
// @ts-ignore
import config from '../keys/config.js'; //typescript problem, this works  when compiled, let it be.
// @ts-ignore
import app from './app.js'; //typescript problem, this works when compiled, let it be.

const serviceAccount = JSON.parse(JSON.stringify(firebaseAccountCredentials)) as admin.ServiceAccount

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
