var userCtrl = require('../controller/auth.js');
var pageCtrl = require('../controller/page.js');

module.exports = function (app, route) {
    //routing for web app
    app.route('/')
        .get(function (req, res) {
            res.render('login', { title: 'Home Page' });
        });

    app.route('/signUp')
        .get(function (req, res) {
            res.render('signUp', { title: 'Sign Up' });
        })
        .post(userCtrl.signUpUser);

    app.route('/login')
        .get(function (req, res) {
            res.render('login', { title: 'Log In' });
        })
        .post(userCtrl.signInUser)

    app.route('/dashboard')
        .get(function (req, res) {
            res.render('dashboard', { title: 'User Dashboard' });
        });

    app.route('/history')
        .get(pageCtrl.getFromHistory);

    app.route('/leaderboard')
        .get(pageCtrl.getFromLeaderBoard);

    app.route('/test')
        .get(function (req, res) {
            res.render('test', { title: 'Typing Speed Page' });
        })
        .post(pageCtrl.postInHistory);
    app.route('/logout')
        .get(userCtrl.signOut);

}