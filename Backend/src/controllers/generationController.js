//const { collectMessages } = require('../collector/discord-collector');
const { collectMessagesFromAllChannels } = require('../collector/discord-collector');
const { generateContent } = require('../processor/content-generator');
const contentDraftSchema = require('../models/contentDraftModel');
const generationLogSchema = require('../models/generationLogModel');
const communityFeedSchema = require('../models/communityFeedmodel');
//const { use } = require('react');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
//const CHANNEL_ID = process.env.DISCORD_GUILD_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const GEMINI_KEY = process.env.GEMINI_API;

const triggerGeneration = async (req, res) => {

    //Guardamos el inicio del proceso en el log
    const startedAt = new Date();

    try {

        //Paso 1: Crear un log de generación con estado "running"
        const log = await generationLogSchema.create({

            status: 'running',
            started_at: startedAt
        });

        //Paso 2: Recolectar mensajes de Discord
        //const messages = await collectMessages(DISCORD_TOKEN, CHANNEL_ID);
        const messages = await collectMessagesFromAllChannels(DISCORD_TOKEN, GUILD_ID); //Si queremos recolectar de todos los canales en vez de uno específico

        await communityFeedSchema.destroy({ truncate: true}); //Limpiamos la tabla de CommunityFeed antes de insertar los nuevos mensajes

        const sortedMessages = messages
            .filter(messages => messages.reactions > 0) //Filtramos solo los mensajes que tienen reacciones
            .sort((a, b) => b.reactions - a.reactions) //Ordenamos los mensajes por número de reacciones de mayor a menor
            .slice(0, 5); //Tomamos solo los 5 mensajes más populares
        
    
        //Guardamos los mensajes más populares en la tabla CommunityFeed, asociándolos con el log de generación actual
        for(const msg of sortedMessages){
            
            await communityFeedSchema.create({
                user_name: msg.author,
                content: msg.content,
                channel_name: msg.channel || null,
                original_date: msg.date,
                reactions: msg.reactions,
                generation_id: log.id
            });
        };

        //Paso 3: Generar contenido con Gemini
        const drafts = await generateContent(messages, GEMINI_KEY);
        
        //Paso 4: Guardar los borradores en la base de datos
        const draftTypes = ['newsletter', 'twitter', 'reddit'];
        
        //Guardamos cada tipo de contenido como un registro separado en la tabla content_drafts
        for (const type of draftTypes) {

            //Guardamos el borrador en la base de datos, asociándolo con el log de generación actual
            await contentDraftSchema.create({
                typeContent: type,
                content: drafts[type],
                message_count: messages.length,
                is_published: false
            });
        }
        
        //Paso 5: Actualizar el log de generación a "success" con el conteo de mensajes y la fecha de finalización
        await log.update({ 

            status: 'success', 
            message_count: messages.length,
            finished_at: new Date()

        });

        //Devolvemos una respuesta exitosa con el conteo de mensajes procesados
        return res.status(200).json({ 

            message: "Generation completed", 
            logs: { message_count: messages.length } 
        });

    } catch (error) {

        //En caso de error, actualizamos el log de generación a "error" con el mensaje de error y la fecha de finalización
        const log = await generationLogSchema.create({
            status: 'error',
            error_msg: error.message,
            started_at: startedAt,
            finished_at: new Date()
        });

        return res.status(500).json({ message: "Generation failed", error: error.message });
    }
};

const getGenerationHistory = async (req, res) => {

    try {
        //Obtenemos el historial de generación ordenado por fecha de creación descendente
        const history = await generationLogSchema.findAll({
            order: [['started_at', 'DESC']]
        });

        //Devolvemos el historial como respuesta JSON
        return res.status(200).json(history);

    } catch (error) {

        return res.status(500).json({ message: "Failed to load generation history", error: error.message });
    }
};

module.exports = { triggerGeneration, getGenerationHistory };