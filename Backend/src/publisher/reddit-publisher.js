const Snoowrap = require("snoowrap");

// const client = new Snoowrap({
//     userAgent: process.env.REDDIT_USER_AGENT,
//     clientId: process.env.REDDIT_CLIENT_ID,
//     clientSecret: process.env.REDDIT_CLIENT_SECRET,
//     username: process.env.REDDIT_USERNAME,
//     password: process.env.REDDIT_PASSWORD,
// });

const client = null;

// async function publishPost(subreddit, title, content) {

//     const post = await client.getSubreddit(subreddit).submitSelfpost({ title, text: content });
    
//     return {
//         id: post.id,
//         url: `https://www.reddit.com${post.permalink}`,
//     };
// }

async function publishPost(subreddit, title, content) {
    if (!client) {
        return { id: null, url: "Reddit no configurado" };
    }
    const post = await client.getSubreddit(subreddit).submitSelfpost({ title, text: content }); 
}

module.exports = { publishPost };

//Se deja este metodo para futura implementacion, pero se comenta para evitar errores por falta de acceso a API de Reddit. 
// Para usarlo, se deben configurar las variables de entorno con las credenciales de Reddit y descomentar el código.