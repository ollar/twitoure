const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.createUserModelOnSignUp = functions.auth.user().onCreate(user => {
    var { uid, email, displayName } = user;
    return admin
        .database()
        .ref('/users/' + uid)
        .set({
            username: displayName,
            email,
            created: Date.now(),
        });
});

exports.removeUserModelOnDelete = functions.auth.user().onDelete(user => {
    var { uid } = user;
    return admin
        .database()
        .ref('/users/' + uid)
        .remove();
});
