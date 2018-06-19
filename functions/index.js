const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const storageBucket = 'twitoure-f968b.appspot.com';

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

exports.removeImageFileOnModelDestroy = functions.database
    .ref('/images/{imageId}')
    .onDelete(snapshot => {
        const value = snapshot.val();

        if (value) {
            return admin
                .storage()
                .bucket(storageBucket)
                .file(value.fullPath)
                .delete();
        }
        return false;
    });
