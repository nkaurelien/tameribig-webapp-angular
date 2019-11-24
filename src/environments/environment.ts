const firebaseConfig = {
    apiKey: 'AIzaSyC6ruvmbR5zrOhfXjdosvFwzja4jmamTpY',
    authDomain: 'tameri-big.firebaseapp.com',
    databaseURL: 'https://tameri-big.firebaseio.com',
    projectId: 'tameri-big',
    storageBucket: 'tameri-big.appspot.com',
    messagingSenderId: '145742938489',
    appId: '1:145742938489:web:e693913dca4177fb'
};

export const environment = {
    logo: 'assets/images/logo.png',

    // ApiBaseUrl: 'http://localhost:5001/tameri-big/us-central1/api',
    ApiBaseUrl: 'http://localhost:3000',
    authTokenKey: 'auth',
    firebaseConfig,
    isMockEnabled: false,
    production: false
};


export const GMAP_API_KEY = 'AIzaSyBn_LS3TTqaSsByi5U7poZjoFLB8Egi2Kk';

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
