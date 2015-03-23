$(document).ready(function() {
    var $body = $('body');

    //create button to grab new tweets
    $body.html("<button type='button' class='refresh'>More Tweets!</button>");

    var $tweets = $("<div class='tweet tweets'></div>");
    $tweets.appendTo($body);

    //return reference to newest tweet
    var newestTweet = function() {
        return streams.home.length - 1;
    };

    //return timestamp of given tweet.
    var getTime = function(tweet) {
        return moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss:SSS a');
    }

    //return easy to read timestamp.
    var getTimeFromPost = function(tweet) {
        return moment(tweet.created_at).fromNow();
    }

    //return tweet given index (from stream). Default is newest tweet.
    var getTweet = function(index) {
        index = index || newestTweet();
        var $tweetContainer = $("<div class='tweet container'></div>");

        var tweet = streams.home[index];
        var $tweet = $("<div class='tweet text'></div>");
        var time = getTime(tweet);
        var $time = $("<div class='tweet time'></div>");
        var user = tweet.user;
        var $user = $("<div class='tweet user'></div>");

        $user.text('@' + tweet.user + ': ');
        $tweet.text(tweet.message);
        $time.text("- " + time);

        $user.appendTo($tweetContainer);
        $("<br>").appendTo($tweetContainer);
        $tweet.appendTo($tweetContainer);
        $("<br>").appendTo($tweetContainer);
        $time.appendTo($tweetContainer);
        $tweetContainer.prependTo($tweets);
    }

    var getUnshownTweets = function() {

    };

    //populate page with first batch of tweets
    var populateTweets = function() {
        var index = streams.home.length - 1;
        while (index >= 0) {
            getTweet(index, false);
            index -= 1;
        }
        var index = streams.home.length - 1;
    }
    populateTweets();

    $('button').on('click', function() {
        getTweet();
    });

    // logs newest tweet every 1.5 secs, for debug
    // var logStream = function() {
    //   var index = streams.home.length - 1;
    //   console.log(JSON.stringify(streams.home[index], null, 4));
    //   console.log('\n ====================================================================== \n')
    // }
    // logStream();
    // setInterval(logStream, 1500);

});
