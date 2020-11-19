# How to setup your server:

## Setting up firebase

1. Create firebase project at https://firebase.google.com/
2. Activate firestore on project
3. Activate authentication with email and password (or choose whatever you want and edit the source code)
4. Set up billing profile and plan choose the Blaze plan (don't worry, you won't exceed the minimium limit for generating payments over 0 NOK)
5. Install `npm i firebase-tools -g`
6. Run `firebase login`
7. Run `firebase init firestore`
8. Add a config.json and serviceAccount.json file in the [./keys](https://github.com/MathiasWP/Webutvikling-Prosjekt/tree/master/server/keys) directory.
   - config.json: Export the firebaseConfig object that you get and set it in a JSON-object (https://firebase.google.com/docs/web/setup#config-object)
   - serviceAccount.json: Must be the json file that you can download under "Service Accounts" on the "Settings" page of your firebase project.

## Starting server

Run `npm start`

## Setting up server side tests

You need to setup 3 things in order for tests to work.

1. UID of a user from firebase authentication.
2. ID of a quiz made for testing (create one using the website GUI)
3. ID of a group room for testing (create one using the website GUI)

Just edit the variables in src/quiz-service.test.ts
