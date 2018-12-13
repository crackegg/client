var admin = require('firebase-admin');

var serviceAccount = require('./keyfile.json');

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 databaseURL: 'https://crackegg-225409.firebaseio.com'
});

var db = admin.firestore();


var docRef = db.collection('users').doc('alovelace');

var setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});


module.exports = db;