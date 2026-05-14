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

    Generá 3 borradores de contenido basados en esta actividad:

    1. **NEWSLETTER** (formato largo, 2-3 párrafos, tono profesional)
    2. **TWITTER** (máximo 280 caracteres, directo y con hashtags)
    3. **REDDIT** (formato medio, 1-2 parrafos, tono conversacional)

    Respondé en formato JSON con esta estructura:
    {
        "newsletter": "...",
        "twitter": "...",
        "reddit": "..."
    }
    Solo respondé con el JSON, sin texto adicional.
    `;

    // 4. Enviar al LLM y obtener respuesta
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // 5. Parsear el JSON de la respuesta
    const clean = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    // 6. Lo q hacemos aca es crear la variable "drafts" y creamos un try-catch por si hay alguna falla 
    // devuelva un objeto con un msj de error y el sistema no se cae
    let drafts;

    try{

        drafts = JSON.parse(clean);
        
    }catch(error){

        console.log("Error al parsear respuesta: ", error);

        drafts = {
            newsletter: "Error al generar el newsletter",
            twitter: "Error al generar el tweet",
            reddit: "Error al generar el reddit"
        };
    }

    return drafts;
}

const TYPE_PROMPTS = {
    newsletter: "**NEWSLETTER** (formato largo, 2-3 párrafos, tono profesional)",
    twitter: "**TWITTER** (máximo 280 caracteres, directo y con hashtags)",
    reddit: "**REDDIT** (formato medio, 1-2 parrafos, tono conversacional)"
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

module.exports = { generateContent, regenerateContent };