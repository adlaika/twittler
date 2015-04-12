//global ignores for JSHint
/* global streams: false, $: false, moment: false */

(function () {
  'use strict';

  //---GLOBAL VARS---
  var $body = $('body');
  var $tweets = $('#tweets');
  var $showTweets = $('#show-tweets');
  var $columns = $('#columns');

  var lastShownTweet = {};

  //---BEHAVIOR---
  $(document).ready(function () {

    //prepopulate with tweets
    populateTweets(streams.home, 0, '#tweets');

    //new tweets button functionality
    $('#show-tweets').click(function () {
      populateTweets(streams.home, 0, '#tweets');
      //console.log(JSON.stringify(streams.home, null, 4));
    });

    //username click functionality
    $(document).on('click', '.user', function (event) {
      event.preventDefault();
      showUserTweets(event.target.id);
      console.log(event.target.id);
    });
  });

  //---HELPER FUNCTIONS---
  var getTweet = function (index, stream) {
    return stream[index];
  };

  var newestTweet = function (stream) {
    return stream[stream.length - 1];
  };

  //return timestamp of given tweet.
  var getTweetTime = function (tweet) {
    return moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a');
  };

  //return easy to read timestamp.
  var getRelativeTweetTime = function (tweet) {
    return moment(tweet.created_at).fromNow();
  };

  //return last shown tweet
  var getLastShownTweet = function () {
    return getTweet(newestTweet(streams.home), streams.home);
  };

  //return true if lastShownTweet is not most recent available
  var checkForUnshownTweets = function () {
    return streams.home[streams.home.length - 1] !== lastShownTweet;
  };

  //create and show tweet given index and stream. Default is newest tweet.
  var showTweet = function (index, stream, target) {
    index = index || stream.indexOf(newestTweet(stream));

    var $tweetContainer = $("<div class='tweet-container'></div>");

    var tweet = getTweet(index, stream);
    var $tweet = $("<div class='tweet text'></div>");
    var time = getRelativeTweetTime(tweet);
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
    $tweetContainer.appendTo(target);

    lastShownTweet = streams.home[streams.home.length - 1];
  };

  //return tweets back to stop index. Default is all tweets.
  var populateTweets = function (stream, stop, target) {
    $('#tweets').empty();
    stop = stop || 0;
    var index = stream.length - 1;
    while (index >= stop + 1) {
      showTweet(index, stream, target);
      index -= 1;
    }
    index = stream.length - 1;
    $('<hr />').appendTo('#tweets');
  };

  var showUserTweets = function (user) {
    populateTweets(streams.users[user], 0, '#tweets');
  };


  //---DEBUG---
  // logs newest tweet every 1.5 secs, for debug
  // var logStream = function () {
  //   var index = streams.home.length - 1;
  //   console.log(JSON.stringify(streams.home[index], null, 4));
  //   console.log('======================================================================');
  // };
  // logStream();
  // setInterval(logStream, 1500);
}());
