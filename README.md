

# Pokedex

This project was generated using NX.

For persistency, I connected it to my own firestore account.

## TLDR;

Please view the hosted version in `http://pokedex-demo.s3-website.eu-central-1.amazonaws.com/`

## How to run

As in any npm projects, make sure to do `npm install`.

And then run `npm run start`.

**Important: Environment file named `environment.ts` needs o to be created inside `/apps/frontend/src/environments`.**

The following firebase configuration needs to be configured in the environment files as follows:

```json
{
  production: false,
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
}
```
