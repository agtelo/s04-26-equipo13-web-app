const { TwitterApi } = require("twitter-api-v2");

// const client = new TwitterApi({
//     appKey: process.env.TWITTER_API_KEY,
//     appSecret: process.env.TWITTER_API_SECRET,
//     accessToken: process.env.TWITTER_ACCESS_TOKEN,
//     accessSecret: process.env.TWITTER_ACCESS_SECRET,
// });

const client = null;

// async function publishTweet(content) {

//     const tweet = await client.v2.tweet(content);

//     return {
//         id: tweet.data.id,
//         url: `https://twitter.com/i/web/status/${tweet.data.id}`,
//     };
// }

async function publishTweet(content) {
    if (!client) {
        return { id: null, url: "Twitter no configurado" };
    }
    const tweet = await client.v2.tweet(content);
    return {
        id: tweet.data.id,
        url: `https://twitter.com/i/web/status/${tweet.data.id}`,
    };
}

module.exports = { publishTweet };

//Se deja este metodo para futura implementacion, pero se comenta para evitar errores por falta de acceso a API de Twitter. 
// Para usarlo, se deben configurar las variables de entorno con las credenciales de Twitter y descomentar el código.