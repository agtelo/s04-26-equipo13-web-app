require("dotenv").config();

const { collectMessages } = require("./collector/discord-collector");
const { generateContent } = require("./processor/content-generator");
const cron = require("node-cron");

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = "1498678945812447389";
const GEMINI_KEY = process.env.GEMINI_API;

async function main() {
    // Paso 1: Recolectar mensajes de Discord
    console.log("Recolectando mensajes de Discord...");
    const messages = await collectMessages(TOKEN, CHANNEL_ID);
    console.log(`Se recolectaron ${messages.length} mensajes`);

    // Paso 2: Generar borradores con IA
    console.log("Generando borradores con Gemini...");
    const drafts = await generateContent(messages, GEMINI_KEY);

    // Paso 3: Mostrar los resultados
    console.log("\n=== NEWSLETTER ===");
    console.log(drafts.newsletter);
    console.log("\n=== LINKEDIN ===");
    console.log(drafts.linkedin);
    console.log("\n=== TWITTER ===");
    console.log(drafts.twitter);
}

// Paso 4: utilizamos cron para contar los dias de la semana y verificamos q sea correcto, para enviar el informe semanal
cron.schedule("0 18 * * 5", async() => { 
    // 0-> minutos, 18-> hora, *-> valores nulos, 5-> dia de la semana en este caso viernes (0 = domingo, ..., 5 = viernes)

    try{

        await main();
        
    }catch(error){

        console.error("Error en el cron: ", error);
    }
});