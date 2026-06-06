const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateContent(messages, apiKey) {
    // 1. Crear el cliente de Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // 2. Convertir los mensajes a texto plano para el prompt
    const messagesText = messages
        .map(msg => `- ${msg.author} dijo: "${msg.content}" (${msg.reactions} reacciones)`)
        .join("\n");

    // 3. El prompt: le decimos al LLM exactamente qué queremos
    const prompt = `
    Sos un editor de contenido de una comunidad tech llamada TalentCircle.
    Estas son las contribuciones más relevantes de la semana en Discord:

    ${messagesText}

    Generá 5 borradores de contenido basados en esta actividad:

    1. **NEWSLETTER** (formato largo, 2-3 párrafos, tono profesional)
    2. **TWITTER** (máximo 280 caracteres, directo y con hashtags)
    3. **BLUESKY** (máximo 250 caracteres, directo y con hashtags)
    4. **LINKEDIN** (máximo 300 caracteres, tono formal y profesional)
    5. **REDDIT** (máximo 200 caracteres, tono casual pero informativo)

    Respondé en formato JSON con esta estructura:
    {
        "newsletter": "...",
        "twitter": "...",
        "bluesky": "...",
        "linkedin": "...",
        "reddit": "..."
    }
    Solo respondé con el JSON, sin texto adicional.
    `;

    // 4. Enviamos al LLM con reintentos
    let response;
    let lastError;

    // Intentamos 3 veces en caso de error (timeouts, rate limits, etc)
    for (let attempt = 1; attempt <= 3; attempt++) {

        try {

            const result = await model.generateContent(prompt); // enviamos el prompt al modelo para generar el contenido
            response = result.response.text(); // obtenemos la respuesta como texto

            break; // salir del loop si funcionó

        } catch (error) {

            lastError = error; // guardamos el error para mostrarlo si los 3 intentos fallan

            if (attempt < 3) {

                console.log(`Intento ${attempt} fallido, reintentando en 5 segundos...`);

                await new Promise(resolve => setTimeout(resolve, 5000)); // esperamos 5 segundos antes de reintentar
            }
        };
    };

    if (!response) {
        console.log("Error al generar después de 3 intentos:", lastError);
        return {
            newsletter: "Error generating newsletter",
            twitter: "Error generating tweet",
            bluesky: "Error generating bluesky",
            linkedin: "Error generating linkedin",
            reddit: "Error generating reddit"
        };
    };

    // 5. Parsear el JSON de la respuesta
    const clean = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    // Lo q hacemos aca es crear la variable "drafts" y creamos un try-catch por si hay alguna falla 
    // devuelva un objeto con un msj de error y el sistema no se cae
    let drafts;

    try{

        drafts = JSON.parse(clean);
        
    }catch(error){

        console.log("Error al parsear respuesta: ", error);

        drafts = {
            newsletter: "Error al generar el newsletter",
            twitter: "Error al generar el tweet",
            bluesky: "Error al generar el bluesky",
            linkedin: "Error al generar el linkedin",
            reddit: "Error al generar el reddit"
        };
    }

    return drafts;
}

const TYPE_PROMPTS = {
    newsletter: "**NEWSLETTER** (formato largo, 2-3 párrafos, tono profesional)",
    twitter: "**TWITTER** (máximo 280 caracteres, directo y con hashtags)",
    bluesky: "**BLUESKY** (máximo 250 caracteres, directo y con hashtags)",
    linkedin: "**LINKEDIN** (máximo 300 caracteres, tono formal y profesional)",
    reddit: "**REDDIT** (máximo 200 caracteres, tono casual pero informativo)"
};

async function regenerateContent(messages, apiKey, type) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const messagesText = messages
        .map(msg => `- ${msg.author} dijo: "${msg.content}" (${msg.reactions} reacciones)`)
        .join("\n");

    const prompt = `
    Sos un editor de contenido de una comunidad tech llamada TalentCircle.
    Estas son las contribuciones más relevantes de la semana en Discord:

    ${messagesText}

    Generá un nuevo borrador diferente al anterior para el siguiente formato:
    ${TYPE_PROMPTS[type]}

    Respondé en formato JSON con esta estructura:
    { "${type}": "..." }
    Solo respondé con el JSON, sin texto adicional.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const clean = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    try {

        return JSON.parse(clean);

    } catch (error) {

        return { message: "Error al regenerar el contenido", error: error };
    }
}

async function regenerateDraftFromContent(existingContent, apiKey, type) {

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
    Sos un editor de contenido de una comunidad tech llamada TalentCircle.
    
    Este es el borrador actual:
    ${existingContent}
    
    Genera una version diferente y mejorada para el formato:
    ${TYPE_PROMPTS[type]}
    
    Respondé en formato JSON con esta estructura:
    { "${type}": "..." }
    Solo respondé con el JSON, sin texto adicional.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const clean = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    try {

        return JSON.parse(clean);

    } catch (error) {
        
        return { message: "Error regenerating content", error: error };
    }
};

module.exports = { generateContent, regenerateContent, regenerateDraftFromContent };
