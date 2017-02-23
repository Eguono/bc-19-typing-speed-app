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
            res.redirect('/dashboard');
        }).catch(function (error) {
            console.log('Google sign in error', error);
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
        }

    });
}

function postInHistory(req, res) {
    var startTime = req.body.date;
    var typingSpeed = req.body.typingSpeed;
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

            ref.child('users/' + userId + '/firstName').once('value', function (snapShot) {

                var result = {};
                var data = {
                    firstName: snapShot.val(),
                    startTime: startTime,
                    typingSpeed: typingSpeed
                };
                var scoresRef = ref.child('history/' + userId);
                var scoreRef = scoresRef.push();
                var scoreKey = scoreRef.key;
                
                result["history/" + userId + "/" + scoreKey] = data;
                result["leaderboard/" + userId] = data;

                ref.update(result);

                res.redirect('/test');
            });
        }

    });

}

function getFromHistory(req, res) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var userId = user.uid;

            ref.child('history/' + userId).on('value', function (snapShot) {
                res.render('history', { title: 'User history', history: snapShot.val() });
                console.log(snapShot.val());
            });

        }
    });

}

function getFromLeaderBoard(req, res) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var userId = user.uid;
            ref.child('leaderboard').on('value', function (snapShot) {
                res.render('leaderBoard', { title: 'Leadership Board', leaders: snapShot.val() });

            });
        }
    });

}


// [END authstatelistener]
module.exports = {
    signInWithGoogle,
    signUpUser,
    signInUser,
    signOut,
    postInHistory,
    getFromHistory,
    getFromLeaderBoard
}
