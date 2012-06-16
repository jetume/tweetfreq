var twitter = require('./twitter.js'),
    MAXTWEETS         = 1000,
    currentTweetCount = 0;
    wordFrequency     = {},
    max_id = undefined;


exports.getWordFrequency = function(handle, callback) {
    var twitterCallBack = function(tweets) {
        if(tweets) {
            handleTweets(tweets);
            
            if(currentTweetCount < MAXTWEETS) {
                twitter.getTweets(handle, max_id, twitterCallBack);
            } else {
                callback(sort(wordFrequency));
            }
        }
    };
    
    twitter.getTweets(handle, max_id, twitterCallBack);
}

var handleTweet = function (tweet) {
    var text = null;
    if (tweet && tweet.text) {
        text = tweet.text;

        // splitting the words on space
        text.split(' ').map(function (part) {
            if (part) {
                if (wordFrequency.hasOwnProperty(part)) {
                    wordFrequency[part]++;
                } else {
                    wordFrequency[part] = 1;
                }
            }
        });
    }
};

var handleTweets = function(tweets) {
    if (tweets && Object.prototype.toString.call(tweets) === '[object Array]') {
        for (var i = 0; i < tweets.length; i++) {
            handleTweet(tweets[i]);
            if (tweets[i].id) {
                max_id = tweets[i].id;
            }
            currentTweetCount++;
        }
    }
};

var sort = function (data) {
    var groupBy = {},
        keys = [],
        sorted = [];

    for(var word in data ) {
        if(typeof groupBy[data[word]] === 'undefined') {
            groupBy[data[word]] = [];
            keys.push(data[word]);
        }
        
        groupBy[data[word]].push(word);
    }



    keys = keys.sort(function(a,b) {
        return b - a;
    })

    for(var i=0;i<keys.length;i++) {
        sorted.push(groupBy[keys[i]].join(","));
    }
    
    return sorted;
}
