const firebaseConfig = {
    apiKey: 'AIzaSyBhFeckCZ5w4OzMVI4Vr1AA2Tm6_26V0UA',
    authDomain: 'connect4-bd651.firebaseapp.com',
    databaseURL: 'https://connect4-bd651.firebaseio.com',
    projectId: 'connect4-bd651',
    storageBucket: 'connect4-bd651.appspot.com',
    messagingSenderId: '881904021212',
    appId: '1:881904021212:web:26a6c4721fe7e3f4118e19',
};
firebase.initializeApp(firebaseConfig);
const gamesStore = firebase.firestore().collection('games');
