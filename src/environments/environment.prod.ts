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

    ApiBaseUrl: 'https://us-central1-tameri-big.cloudfunctions.net/api',
    authTokenKey: 'auth',
    firebaseConfig,
    isMockEnabled: false,
    production: true,
    debug: false,
    googleRecaptcha: {
        siteKey: '6LdeIF4UAAAAAKxgylvPnXDfj9r17jh7v4YpWZTq',
        badge: 'bottomright',
        size: 'invisible',
        hl: 'fr',
        theme: 'ligth',
        type: 'image',
    },
    analytics_id: 'UA - 121086448 - 2',
    googletagmanager_id: 'GTM - MZJM9NF',
    cookies: {
        permission_timeout: 5000,
    },
};


export const GMAP_API_KEY = 'AIzaSyBn_LS3TTqaSsByi5U7poZjoFLB8Egi2Kk';
export const MESSAGING_SERVER_KEY = 'AAAA5ub8w6Y:APA91bH_4ONKLKcZrHJiac9M_mJhnL63YSPKYQc1QLZSV2HJuSbSGPnhdFwHdKN_6o6qrs2oOeu5VqJ4EfWztbuHgDieGxOg40dmGpLH0BQzmvdNg8GGdfNu4Ubs23avkL2BplIgzGnsd68fZyzQLPrb1cPoY6K_bw';
export const LEGACY_MESSAGING_SERVER_KEY = 'AIzaSyA_UR4Rzt10hlBjyx60vmSosFn2Wr_bEh4';
