var firebase = require("firebase");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwtbDQxEwPUIba86ycqnndFQM5wy3WgqI",
    authDomain: "bc-19-typing-speed-app.firebaseapp.com",
    databaseURL: "https://bc-19-typing-speed-app.firebaseio.com",
    storageBucket: "bc-19-typing-speed-app.appspot.com",
    messagingSenderId: "99519717704"
  };

module.exports = firebase.initializeApp(config);

