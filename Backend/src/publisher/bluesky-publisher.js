const { BskyAgent } = require('@atproto/api');

const agent = new BskyAgent({
    service: 'https://bsky.social'
});

async function Bluesky(content){

    await agent.login({
        identifier: process.env.BLUESKY_USERNAME,
        password: process.env.BLUESKY_PASSWORD
    });

    const post = await agent.post({
        text: content
    });

    return {
        id: post.uri,
        url: `https://bsky.app/profile/${process.env.BLUESKY_USERNAME}/post/${post.uri.split('/').pop()}`
    };
}

module.exports = { Bluesky };