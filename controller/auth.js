var firebase = require('../initialize/firebaseInit');
var db = firebase.database();
var ref = db.ref("/");
var firstName, lastName, email, password, userId

function signUpUser(req, res) {
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    email = req.body.email;
    password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            var userId = user.uid
            var usersRef = ref.child("users/" + userId);


            return usersRef.set({
                firstName: firstName,
                lastName: lastName,
                email: email
            });

        })
        .then(res.redirect('/dashboard'))
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                console.log('The password is too weak.');
                res.redirect('/signUp');
            }
            else if (errorMessage === 'The password is invalid or the user does not have a password.') {
                res.redirect('/signUp');
            }
            else {
                console.log(errorMessage);
                res.redirect("/dashboard");
            }
            // [END_EXCLUDE]     
        });

}

function signInUser(req, res) {
    email = req.body.email;
    password = req.body.password
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) { res.redirect('/dashboard') })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorMessage === "The password is invalid or the user does not have a password.") {
                res.redirect('/login');
            }
            console.log(errorMessage);
        })

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


// [END authstatelistener]
module.exports = {
    signUpUser,
    signInUser,
    signOut,
}
