//Archivo principal del backend, encargado de iniciar el servidor, configurar las rutas y programar la tarea de generación semanal
require("dotenv").config();

//Importamos las funciones necesarias para la recolección de mensajes y generación de contenido
const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const { collectMessages, getAvailableChannels, collectMessagesFromAllChannels } = require("./collector/discord-collector");
const { generateContent } = require("./processor/content-generator");

//Importamos las rutas y el modelo de la base de datos
const userRoutes = require("./routes/userRoutes");
const regenerateRoutes = require("./routes/regenerateRoutes");
const publishRoutes = require("./routes/publishRoutes");
const draftRoutes = require("./routes/draftRoutes");
const generationRoutes = require("./routes/generationRoutes");
const sequelize = require("./config/database");

//Variables de entorno
const TOKEN = process.env.DISCORD_TOKEN; //el bot
const GUILD_ID = process.env.DISCORD_GUILD_ID; //id del server
const GEMINI_KEY = process.env.GEMINI_API;

//Creamos la aplicación de Express
const app = express();

//Configuramos los middlewares y las rutas
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
app.use("/user", userRoutes);
app.use("/api",publishRoutes);
app.use("/generation", generationRoutes);
app.use("/drafts", draftRoutes);
app.use("/api", regenerateRoutes);

//Función principal que se ejecutará en el cron para realizar la generación semanal
async function main() {

    // Paso 0: Ver canales disponibles (NUEVO)
    console.log("Buscando canales disponibles...");
    try {

        const availableChannels = await getAvailableChannels(TOKEN, GUILD_ID);
        console.log("Canales encontrados:");

        // Mostramos la lista linda en la consola
        availableChannels.forEach(ch => {

            console.log(`- ${ch.name} (ID: ${ch.id}) [Categoría: ${ch.category}]`);
        });

    } catch (error) {

        console.error("Error al traer los canales:", error);
    }

    // Paso 1: Recolectar mensajes de Discord
    console.log("Recolectando mensajes de Discord...");

    //const messages = await collectMessages(TOKEN, GUILD_ID);
    const messages = await collectMessagesFromAllChannels(TOKEN, GUILD_ID); //Si queremos recolectar de todos los canales en vez de uno específico
    console.log(`Se recolectaron ${messages.length} mensajes`);

    // Paso 2: Generar borradores con IA
    console.log("Generando borradores con Gemini...");
    const drafts = await generateContent(messages, GEMINI_KEY);

    // Paso 3: Mostrar los resultados
    console.log("\n=== NEWSLETTER ===");
    console.log(drafts.newsletter);
    console.log("\n=== REDDIT ===");
    console.log(drafts.reddit);
    console.log("\n=== TWITTER ===");
    console.log(drafts.twitter);
}

//Iniciamos el servidor y sincronizamos la base de datos
async function startServer() {

    try{
        await sequelize.authenticate();
        console.log("Conexion a la bd exitosa");

        await sequelize.sync();
        console.log("Tablas sincronizadas");

        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el ${PORT}`);
        });
        
    }catch(error){
        console.log("Error al conectar a la base de datos: ", error);
    };
}

startServer();

// Paso 4: utilizamos cron para contar los dias de la semana y verificamos q sea correcto, para enviar el informe semanal
cron.schedule("0 18 * * 5", async () => {
    // 0-> minutos, 18-> hora, *-> valores nulos, 5-> dia de la semana en este caso viernes (0 = domingo, ..., 5 = viernes)

    try{

        await main();

    } catch (error) {

        console.error("Error en el cron: ", error);
    }
});