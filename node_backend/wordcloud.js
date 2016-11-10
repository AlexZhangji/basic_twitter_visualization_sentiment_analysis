var express = require('express');
var Twitter = require('twitter');



var app = express();


var client = new Twitter({
    consumer_key: 'KIauG32B5KnWe5hGm17dgzcrd',
    consumer_secret: 'wZAYLm1g3YPj1oRsXs6A1YQPiVGnVyduxGraBZz5PIf7mzR1u7',
    access_token_key: '630369678-9778kU3lfqOGH9Mv4J21JzEhHEy6fInGobcnbbkt',
    access_token_secret: 'GzrSl4QYXxyT5UoqKp11xn8EOVcVKsFIB90bV0VwzMbX9'
});


var resultTweet = [];

function parseTweets(tweets) {
    var tweetArr = [];

    tweets.map(function(tweet) {
        tweetArr.push(tweet.text);
    });

    return tweetArr;
}

app.get('/api/twitter/:key', function(request, respond) {
    // get the key term from api call
    var params = {
        screen_name: request.params.key
    };

    // console.log(params);

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
            tweets = parseTweets(tweets);
            console.log(tweets);
            respond.json({
                tweets
            });
        } else {
            console.log('error');
        }
    });


});



app.listen(3000)
