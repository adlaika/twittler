//global ignores for JSLint
/*global streams*/

'use strict';

$(document).ready(function () {
  var $body = $('body');

  //create nav bar
  var $navbar = $("<div class='navbar'></div>");
  $navbar.appendTo($body);

  //create div where tweets live
  var $tweets = $("<div class='tweets'></div>");
  $tweets.appendTo($body);

  //create button to grab new tweets
  var $refresh = $("<div class='refresh'>More Tweets!</button>");
  $refresh.insertAfter('body div:lt(1)');

  var getTweet = function (index, stream) {
    return stream[index];
  };

  var newestTweet = function (stream) {
    return stream.length - 1;
  };

  //return timestamp of given tweet.
  var getTweetTime = function (tweet) {
    return moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a');
  };

  // //return easy to read timestamp.
  // var getTweetTimeFromPost = function (tweet) {
  //   return moment(tweet.created_at).fromNow();
  // };

  // //return last shown tweet
  // var getLastShownTweet = function () {
  //   return getTweet(newestTweet(streams.home), streams.home);
  // };

  var lastShownTweetIndex = 0;

  //check to see if last shown tweet is newest
  var checkForUnshownTweets = function () {
    return lastShownTweetIndex < streams.home.length - 1;
  };

  var ifUnshownShowButton = function () {
    if (checkForUnshownTweets()) {
      $('.refresh').show();
    }
  };

  //create and show tweet given index and stream. Default is newest tweet.
  var showTweet = function (index, stream, prependTarget) {
    index = index || newestTweet(stream);
    var $tweetContainer = $("<div class='tweet container'></div>");

    var tweet = getTweet(index, stream);
    var $tweet = $("<div class='tweet text'></div>");
    var time = getTweetTime(tweet);
    var $time = $("<div class='tweet time'></div>");
    var user = tweet.user;
    var $user = $("<div class='tweet user'></div>");
    //create username link
    var link = "<a class='link' id=" + user + " href='#'>" + user + "</a>";

    //create tweet, add to structure
    $user.html('@' + link);
    $tweet.text(tweet.message);
    $time.text(': ' + time);

    $user.appendTo($tweetContainer);
    $time.appendTo($tweetContainer);
    $('<br>').appendTo($tweetContainer);
    $tweet.appendTo($tweetContainer);
    $tweetContainer.prependTo(prependTarget);

    //set username link click behavior
    var $link = $("#" + user);
    $link.on('click', function (event) {
      event.preventDefault();
      //console.log(JSON.stringify(streams.users[user], null, 4));
      var $userTweets = $("<div class='userTweets'></div>");
      populateTweets(0, streams.users[user], $userTweets);
      $("<span class='hisTweets'>" + user + "'s tweets:" + "</span>").prependTo($userTweets);
      $userTweets.insertAfter($refresh);
    });

    lastShownTweetIndex = streams.home.length - 1;
  };

  //return tweets back to stop index. Default is all tweets.
  var populateTweets = function (stop, stream, prependTarget) {
    stop = stop || 0;
    var index = stream.length - 1;
    while (index >= stop + 1) {
      showTweet(index, stream, prependTarget);
      index -= 1;
    }
    index = stream.length - 1;
  };

  //click button to get new tweets
  $refresh.click(function () {
    populateTweets(lastShownTweetIndex, streams.home, $tweets);
    //lastShownTweet = getLastShownTweet();
    $refresh.hide();
  });

  // logs newest tweet every 1.5 secs, for debug
  // var logStream = function () {
  //   var index = streams.home.length - 1;
  //   console.log(JSON.stringify(streams.home[index], null, 4));
  //   console.log('\n ====================================================================== \n')
  // }
  // logStream();
  // setInterval(logStream, 1500);

  //initialize page
  populateTweets(0, streams.home, $tweets);
  //var lastShownTweet = getLastShownTweet();
  setInterval(ifUnshownShowButton, 1000);

});
