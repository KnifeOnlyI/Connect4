const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.clearGamesNotFinished = functions.https.onRequest(async (request, response) => {
    const snap = await admin.firestore()
        .collection("games")
        .where("winner", "==", "")
        .get()

    const deletions = [];

    snap.forEach((doc) => {
        deletions.push(admin.firestore().collection('games').doc(doc.id).delete());
    });

    Promise.all(deletions).then(() => {
        response.send('done');
    });

});