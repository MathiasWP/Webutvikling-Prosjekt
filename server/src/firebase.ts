import firebase from 'firebase'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import firebaseAccountCredentials from '../keys/serviceAccount.json';
import { config } from '../keys/config'
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount
import app from './app'


admin.initializeApp()
firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...config
});

firebase.auth.Auth.Persistence.SESSION;

export const auth = firebase.auth();
export const db = admin.firestore();
export const webApi = functions.https.onRequest(app)
