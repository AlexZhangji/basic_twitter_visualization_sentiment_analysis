var dotenv = require('dotenv');
dotenv.config();

var express = require('express');
var Twitter = require('twitter');
var sentiment = require('sentiment');

var cors = require('cors');



var app = express();
app.use(cors());

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});


var resultTweet = [];

function parseTweets(tweets) {
  var tweetArr = [];

  tweets.statuses.map(function(tweet) {
    tweetArr.push(tweet.text);
  });
  return tweetArr;
}

function getSentimentArr(tweetArr) {
  var sentiArr = [];

  tweetArr.map(function(tweet) {
    var curSenti = sentiment(tweet);
    var tweetSenti = {
      score: curSenti.score,
      comparative: curSenti.comparative
    };

    sentiArr.push(tweetSenti);
  });

  return sentiArr;
}

app.get('/api/twitter/:key', function(request, respond) {
  // get the key term from api call
  var params = {
    q: request.params.key,
    count: 100
  };

  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      var cleanTweetsArr = parseTweets(tweets);
      var sentiArr = getSentimentArr(cleanTweetsArr);

      // update max id to avoid overlap
      params.max_id = parseInt(tweets.statuses[tweets.statuses.length - 1].id_str) - 1;

      client.get('search/tweets', params, function(error, tweets, response) {
        if (!error) {
          var curTweetArr = parseTweets(tweets);
          cleanTweetsArr = cleanTweetsArr.concat(curTweetArr);
          sentiArr = sentiArr.concat(getSentimentArr(curTweetArr));

          params.max_id = parseInt(tweets.statuses[tweets.statuses.length - 1].id_str) - 1;

          client.get('search/tweets', params, function(error, tweets, response) {
            if (!error) {
              curTweetArr = parseTweets(tweets);
              cleanTweetsArr = cleanTweetsArr.concat(curTweetArr);
              sentiArr = sentiArr.concat(getSentimentArr(curTweetArr));

              params.max_id = parseInt(tweets.statuses[tweets.statuses.length - 1].id_str) - 1;

              client.get('search/tweets', params, function(error, tweets, response) {
                if (!error) {
                  curTweetArr = parseTweets(tweets);
                  cleanTweetsArr = cleanTweetsArr.concat(curTweetArr);
                  sentiArr = sentiArr.concat(getSentimentArr(curTweetArr));
                  respond.json({
                    cleanTweetsArr,
                    sentiArr
                  });
                }
              });
            }
          });
        }
      });
    } else {
      console.log('error');
    }
  });
  // end of client get
});



app.listen(3000)
