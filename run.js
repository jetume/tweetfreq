var tweetfreq = require('./lib/tweetfreq.js');

var handle = "bhogleharsha";
tweetfreq.getWordFrequency(handle, function(freqData) {
    console.log(freqData);
});