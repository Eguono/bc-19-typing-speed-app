var firebase = require('../initialize/firebaseInit');
var db = firebase.database();
var ref = db.ref("/");
var firstName, lastName, email, password

function signUpUser(req, res) {
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    email = req.body.email;
    password = req.body.password;

    initApp();
    firebase.auth().createUserWithEmailAndPassword(email, password)
        // .then(function (userObject) {
        //     var userId = userObject.uid;

        //     // Write the user joined date to the user table in db
        //     

        // })
        .then(res.redirect('/dashboard'))
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                console.log('The password is too weak.');
            } else {
                console.log(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
            res.redirect('/signUp');
        });

}

function signInWithGoogle() {
    //Sign in with Google
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    initApp();
    return firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;

            console.log(token)
            console.log(user)
            res.redirect('/dashboard');
        }).catch(function (error) {
            console.log('Google sign in error', error);
        });
}


function signInUser(req, res) {
    email = req.body.email;
    password = req.body.password
    initApp();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res.redirect('/dashboard'))
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}
function signOut(req, res) {
    firebase.auth().signOut().then(function () {
        res.redirect('/login');
    }, function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
}


function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var userId = user.uid;
            var providerData = user.providerData;
            var usersRef = ref.child("users/" + userId);


            return usersRef.set({
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            console.log(user);
        }

    });
}
// [END authstatelistener]
module.exports = {
    signInWithGoogle,
    signUpUser,
    signInUser,
    signOut,
}
