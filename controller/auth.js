var firebase = require('../help/firebaseInit');
var db = firebase.database();

function registerUser(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (userObject) {
            var userId = userObject.uid;

            var ref = db.ref("/");
            var usersRef = ref.child("users/" + userId);

            // Write the user joined date to the user table in db
            usersRef.update({
                firstName: firstName,
                lastName: lastName,
                email: email
            });

        })
        .then(res.redirect('/login'))
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
            res.redirect('/register');
        });

}

function signInWithGoogle() {
    //Sign in with Google
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    return firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;

            console.log(token)
            console.log(user)
        }).catch(function (error) {
            console.log('Google sign in error', error);
        });
}


function signInUser(req, res) {
    var email = req.body.email;
    var password = req.body.password

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
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

module.exports = {
    signInWithGoogle,
    registerUser,
    signInUser,
    signOut
}
