# Quiz App - Webutvikling 2020 Høst

Quiz app med React på klient-siden og Firebase/Express på server siden.
Språk brukt: TypeScript

## How to setup:
- Server: go to ./server for guidance
- Client: go to ./client for guidance

## After you have set everything up, do the following to make the tests work:

__NOTE: The secrets must be a single string wrapped in quotes (see example below)__

- Add 3 GitHub secrets:
    - CLIENT_CONFIG (should contain the data in: `./client/src/config/config.ts`)
    - SERVER_CONFIG (should contain the data in: `./server/keys/config.ts`)
    - SERVER_SERVICE_ACCOUNT  (should contain the data in: `./server/keys/serviceAccount.json`)


#### Example:
Data like this: 

```
export const config = {
    databaseURL: "https://example-quiz.firebaseio.com",
    apiKey: "AIzaSyAewnWaweifu0sdvOY80.",
    authDomain: "example-quiz.firebaseapp.com",
    projectId: "example-quiz",
    storageBucket: "example-quiz.appspot.com",
    messagingSenderId: "w3409fuseriofj",
    appId: "1:293084092384:web:bc930458029348"
}
```

must be formatted like this (notice the \ (backslash) before the double-quotes):

```
"export const config = { databaseURL: \"https://example-quiz.firebaseio.com\", apiKey: \"AIzaSyAewnWaweifu0sdvOY80.\", authDomain: \"example-quiz.firebaseapp.com\", projectId: \"example-quiz\", storageBucket: \"example-quiz.appspot.com\", messagingSenderId: \"w3409fuseriofj\", appId: \"1:293084092384:web:bc930458029348\" }"
```
