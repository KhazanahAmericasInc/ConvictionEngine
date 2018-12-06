# Conviction Engine Front-end (client)
This is the front-end (client) part of the Conviction Engine project. 

Note: Create-react-app gives development warnings that show up only in development. These show up because of the way react works with web3, and the way that async is currently used (instead of promises). These warnings can be skipped by pressing the 'x' at the top right of the overlay and/or pressing the esc button. There should be quite a few of these warnings upon the refresh of the page (~17). They can be fixed by either removing the warning script from the create-react-app modules and/or using only promises instead of async calls.

## Quickstart
Please see the project README for pre-requisite dependencies.

Install node dependencies:
```
$npm install
```

Start development server:
```
$npm start
```

## Deployment to Firebase
Make sure the Firebase command line interface is properly installed.
```
$npm i -g firebase-tools 
```

Create a production build of the front-end.
```
$npm build
```

Deploy on firebase.
```
$firebase deploy
```

