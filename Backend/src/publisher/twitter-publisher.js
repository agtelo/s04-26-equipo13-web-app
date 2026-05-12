const { TwitterApi } = require("twitter-api-v2");
const {
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET,
} = require("../config");

const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_SECRET,
});

async function publishTweet(content) {
    const tweet = await client.v2.tweet(content);
    return {
        id: tweet.data.id,
        url: `https://twitter.com/i/web/status/${tweet.data.id}`,
    };
}

module.exports = { publishTweet };
