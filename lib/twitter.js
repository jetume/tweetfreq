var request = require('request'),
    qs = require('querystring');

var limit = 100;
var queryParams = {
    include_rts: false,
    trim_user: true,
    include_entities: false,
    screen_name: '',
    count: limit
};
var opts = {
    uri: "https://api.twitter.com/1/statuses/user_timeline.json"
};

exports.getTweets = function(handle, max_id, callback) {
    queryParams.screen_name = handle;
    
    if(typeof max_id !== 'undefined') {
        queryParams.max_id = max_id;
    }
    
    opts.uri += '?' + qs.encode(queryParams);
    
    var handler = function (error, response, body) {
        if(response.statusCode === 200) {
            try {
                callback(JSON.parse(body));
            } catch(e) {
                callback(false);
            }
        } else {
            throw Exception('Non 200 result');
        }
    };
    
    request(opts, handler);
};
