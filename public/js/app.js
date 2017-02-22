function compareArticle(article, typed) {
  var result = 0
  var art = article.split(" ");
  var typ = typed.split(" ");
  if (typ.length >= art.length) {
    for (var i = 0; i < typ.length; i++) {
      var index = art.indexOf(typ[i]);
      if (index === -1) {
        result += index;
      }
    }
  }
  return result;
}

function retriveFromLocalStorage(name){
  return JSON.parse(localStorage.getItem(name));
}

function timeTominutesandSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function timeToSeconds(millis) {
  var seconds = (millis / 1000);
  return seconds;
}

function timeToMinutes(millis) {
  var minutes = Math.floor(millis / 60000);
  return minutes;
}

var start, end
start = new Date();
end = new Date();

function typeSpeed(article, typed) {
  var compare = compareArticle(article, typed);
  if (compare > -6) {
    var time = timeToSeconds(start.getTime() - end.getTime());
    var words = article.length;
    var speed = (words / time) * 60;
    return speed;
  }
  return "You made too many errors";
}

function store() {
  var inputText = document.getElementById("email");
  localStorage.setItem("email", inputEmail.value);
}

function getRandomArticles(article){
    return article[Math.floor(Math.random()* 10)];

}


var firstArticle = "Humans use mirrors so reflexively that we’ll often use shop windows or phone screens to preen ourselves without a second thought. But it didn’t always come so easy. Before the age of about two, kids don’t see themselves when they look in the mirror—they have to develop that ability over time. Until they do, they just think they're looking at another baby. And new evidence suggests the same might be true for some monkeys";

var secondArticle = "Great apes and humans have long been amongst the few species to pass the mirror test, also known as the mark test. When researchers put an ink mark on a great ape’s forehead without the ape realizing, then put it in front of a mirror, the ape can recognize that it’s looking at its own reflection and will reach up to touch the unfamiliar mark.";

var thirdArticle = "There’s some evidence that dolphins, killer whales, Asian elephants, and magpies can do similar things, though some scientists contest the issue. Most primates can’t even pass the test. And what that’s told primatologists for years is that many species aren’t self-aware. If you can’t recognize yourself in a mirror, that means you don’t have a sense of self.";

var fourthArticle = "A new study in the Proceedings of the National Academy of Sciences suggests just that: we weren’t doing a thorough enough test. If you teach monkeys how to use a mirror well enough, they can demonstrate an understanding of self. “I’ve never seen a monkey do that before,” says Annika Paukner, a staff scientist at the National Institutes of Health who wasn't involved in the new study.";

var fifthArticle = "We’ve never known why they don’t do it when great apes and humans do. No one had any idea. This is the most convincing paper I’ve seen so far that they do.The really impressive part wasn’t the main experiment, though.";

var sixArticle = "The main experiment involved training the monkeys to touch a point of light projected onto their faces (another form of the mark test), which they were able to do after a few weeks of training.But rhesus monkeys can do a lot of things if you train them.Even pigeons can peck at spots on their own bodies via a mirror image if you train them with food rewards.";

var seventhArticle = "Rhesus monkeys will even inspect their genital areas in a mirror, though there’s some debate about whether that’s truly a sign of self- awareness.Paukner argues it probably isn’t(or that it's at least up for debate), while Abigail Rajala, a neuroscientist at University of Wisconsin-Madison (who also wasn't involved in the new study) argues that it is a sign of self- awareness.";

var eighthArticle = "Both agreed that what the rhesus monkeys demonstrated went above and beyond.They inspected their faces in their mirrors on their own time as if the light experiment had taught them to appreciate the fundamental nature of a mirror and its potential uses.";

var ninthArticle = "When these monkeys went back to their cages, they weren’t preening with their mirrors because someone trained them to do so. They’d generalized the knowledge they'd accumulated over time, explains Rajala.";

var tenthArticle = "The rhesus monkeys she’s worked with have exhibited similar learning. Her lab puts mirrors into the cages when the monkeys are just infants, giving them ample time to learn and understand how the surfaces work.";
var articles = [firstArticle, secondArticle, thirdArticle, fourthArticle, fifthArticle, sixArticle, seventhArticle, eighthArticle, ninthArticle, tenthArticle];