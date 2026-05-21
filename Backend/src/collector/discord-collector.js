// Client: conexión principal con Discord
// GatewayIntentBits: enum de permisos que el bot necesita
// Events: enum de tipos de eventos que Discord emite

const { Client, GatewayIntentBits, Events } = require("discord.js");

// Definimos los permisos que vamos a reutilizar
const botIntents = [
    GatewayIntentBits.Guilds, // permiso a ver el server
    GatewayIntentBits.GuildMessages, // permiso a mensajes de los miembros
    GatewayIntentBits.MessageContent // permiso a el contenido de los mensajes
];

// Función original modificada (ahora crea su propio cliente)
async function collectMessages(token, channelId) {
    const client = new Client({ intents: botIntents });
    await client.login(token);

    // 2. Esperar a que el bot esté listo
    await new Promise(resolve => {
        client.once(Events.ClientReady, () => {
            console.log("Bot conectado para recolectar mensajes como:", client.user.tag);
            resolve();
        });
    });

    // 3. Buscar el canal por ID
    const channel = await client.channels.fetch(channelId);

    // 4. Traer los últimos 100 mensajes
    const messages = await channel.messages.fetch({ limit: 100 });

    // 5. Filtramos por semana, para que el sistema se active los viernes
    /*
        Creamos la variable "sevenDays" y la igualamos a Date.now() y le restamos el 7 (dias de la semana) 
        a esto le multiplicamos el valor de un dia en segundos y lo pasamos a milisegundos a todo
    */
    const segDay = 86400;
    const mili = 1000;    

    const sevenDays = Date.now() - (7 * segDay * mili);

    // 6. Convertimos a un array simple los datos y filtramos por fecha
    const result = messages.map(msg => ({

        author: msg.author.username,
        content: msg.content,
        date: msg.createdAt,
        reactions: msg.reactions.cache.size

    })).filter(msg => msg.date.getTime() > sevenDays); //.getTime() para cambiar a milisegundos la variable

    client.destroy();

    return result;
}

// Nueva función para listar canales (también crea su propio cliente)
async function getAvailableChannels(token, guildId) {
    const client = new Client({ intents: botIntents });
    await client.login(token);

    // 2. Esperar a que esté listo
    await new Promise(resolve => {
        client.once(Events.ClientReady, () => {
            console.log("Bot conectado para listar canales como:", client.user.tag);
            resolve();
        });
    });

    // 3. Obtener el servidor
    const guild = await client.guilds.fetch(guildId);

    // 4. Traer todos los canales
    const channels = await guild.channels.fetch();

    // 5. Filtrar solo canales de texto (tipo 0 = GuildText)
    const textChannels = channels
        .filter(ch => ch.type === 0)
        .map(ch => ({
            id: ch.id,
            name: ch.name,
            category: ch.parent?.name || "Sin categoría"
        }));

    client.destroy();

    return textChannels;
}

//Función para recolectar mensajes de todos los canales de texto (opcional, no se usa en el cron pero puede ser útil para pruebas o futuras funcionalidades)
async function collectMessagesFromAllChannels(token, guildId) {
    // 1. Obtener todos los canales
    const channels = await getAvailableChannels(token, guildId);
    
    // 2. Crear cliente y conectar
    const client = new Client({ intents: botIntents });
    await client.login(token);
    
    await new Promise(resolve => {
        client.once(Events.ClientReady, () => resolve());
    });
    
    const sevenDays = Date.now() - (7 * 86400 * 1000);
    let allMessages = [];
    
    // 3. Iterar sobre cada canal y recolectar mensajes
    for (const channelInfo of channels) {

        try {

            const channel = await client.channels.fetch(channelInfo.id);

            if (!channel) continue;
            
            const messages = await channel.messages.fetch({ limit: 100 });
            
            const filtered = messages.map(msg => ({

                author: msg.author.username,
                content: msg.content,
                date: msg.createdAt,
                reactions: msg.reactions.cache.size,
                channel: channelInfo.name

            })).filter(msg => msg.date.getTime() > sevenDays);
            
            allMessages = [...allMessages, ...filtered];

        } catch (error) {

            console.log(`Error en canal ${channelInfo.name}:`, error.message);
        }
    }
    
    client.destroy();

    return allMessages;
}

// Exportar las funciones para usarlas desde index.js o desde donde armes la API
module.exports = { collectMessages, getAvailableChannels, collectMessagesFromAllChannels };