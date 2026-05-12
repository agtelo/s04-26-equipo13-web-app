const Snoowrap = require("snoowrap");
const {
    REDDIT_CLIENT_ID,
    REDDIT_CLIENT_SECRET,
    REDDIT_USERNAME,
    REDDIT_PASSWORD,
    REDDIT_USER_AGENT,
} = require("../config");

const client = new Snoowrap({
    userAgent: REDDIT_USER_AGENT,
    clientId: REDDIT_CLIENT_ID,
    clientSecret: REDDIT_CLIENT_SECRET,
    username: REDDIT_USERNAME,
    password: REDDIT_PASSWORD,
});

async function publishPost(subreddit, title, content) {
    const post = await client.getSubreddit(subreddit).submitSelfpost({ title, text: content });
    return {
        id: post.id,
        url: `https://www.reddit.com${post.permalink}`,
    };
}

module.exports = { publishPost };
