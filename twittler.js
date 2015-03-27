'use strict';

$(document).ready(function() {
    var $body = $('body');

    //create nav bar
    var $navbar = $("<div class='navbar'></div>");
    $navbar.appendTo($body);

    //create button to grab new tweets
    $navbar.html("<button type='button' class='refresh'>More Tweets!</button>");

    //create div where tweets live
    var $tweets = $("<div class='tweets'></div>");
    $tweets.appendTo($body);

    //return timestamp of now
    var getTimeNow = function() {
        return moment();
    }

    //return reference to tweet given index
    var getTweet = function(index) {
        return streams.home[index];
    }

    //return reference to newest tweet
    var newestTweet = function() {
        return streams.home.length - 1;
    };

    //return timestamp of given tweet.
    var getTweetTime = function(tweet) {
        return moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a');
    }

    //return easy to read timestamp.
    var getTweetTimeFromPost = function(tweet) {
        return moment(tweet.created_at).fromNow();
    }

    //return last shown tweet
    var getLastShownTweet = function() {
        return getTweet(newestTweet());
    }

    var lastShownTweetIndex = 0;

    //check to see if last shown tweet is newest
    var checkForUnshownTweets = function() {
        return lastShownTweetIndex < streams.home.length - 1;
    }

    var ifUnshownShowButton = function() {
        if (checkForUnshownTweets()){
            $('button').show();
        }
    }

    //create html and append for tweet given index (from stream). Default is newest tweet.
    var showTweet = function(index) {
        index = index || newestTweet();
        var $tweetContainer = $("<div class='tweet container'></div>");

        var tweet = getTweet(index);
        var $tweet = $("<div class='tweet text'></div>");
        var time = getTweetTime(tweet);
        var $time = $("<div class='tweet time'></div>");
        var user = tweet.user;
        var $user = $("<div class='tweet user'></div>");

        $user.text('@' + tweet.user);
        $tweet.text(tweet.message);
        $time.text(': ' + time);

        $user.appendTo($tweetContainer);
        $time.appendTo($tweetContainer);
        $('<br>').appendTo($tweetContainer);
        $tweet.appendTo($tweetContainer);
        $tweetContainer.prependTo($tweets);

        lastShownTweetIndex = streams.home.length - 1;
    }

    //return tweets back to stop index. Default is all tweets.
    var populateTweets = function(stop) {
        stop = stop || 0;
        var index = streams.home.length - 1;
        while (index >= stop + 1) {
            showTweet(index);
            index -= 1;
        }
        var index = streams.home.length - 1;
    }

    //click button to get new tweets
    $('button').on('click', function() {
        populateTweets(lastShownTweetIndex);
        lastShownTweet = getLastShownTweet();
        $('button').hide();
    });

    // logs newest tweet every 1.5 secs, for debug
    // var logStream = function() {
    //   var index = streams.home.length - 1;
    //   console.log(JSON.stringify(streams.home[index], null, 4));
    //   console.log('\n ====================================================================== \n')
    // }
    // logStream();
    // setInterval(logStream, 1500);

    //initialize page
    populateTweets();
    var lastShownTweet = getLastShownTweet();
    setInterval(ifUnshownShowButton, 1000);

});
