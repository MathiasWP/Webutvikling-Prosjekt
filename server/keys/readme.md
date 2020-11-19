# Files that should be added to this folder:

- **config.JS**
- **serviceAccount.JSON**

### config.ts template:

```
module.exports = {
    databaseURL: "~DATABASE_URL~",
    apiKey: "~API_KEY~",
    authDomain: "~AUTH_DOMAIN~",
    projectId: "~PROJECT_ID~",
    storageBucket: "~STORAGE_BUCKET~,
    messagingSenderId: "~MESSAGING_SENDER_ID~",
    appId: "~APP_ID~"
}
```

### serviceAccount.json template:

```
{
  "type": "service_account",
  "project_id": "~PROJECT_ID~"",
  "private_key_id": "~PRIVATE_KEY_ID~"",
  "private_key": "~PRIVATE_KEY~",
  "client_email": "f~CLIENT_EMAIL~"",
  "client_id": "~PRIVATE_ID~"",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "~CLIENT_X509_CERT_URL~""
}
```
