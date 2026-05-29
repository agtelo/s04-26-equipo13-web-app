//Archivo principal del backend, encargado de iniciar el servidor, configurar las rutas y programar la tarea de generación semanal
require("dotenv").config();

//Importamos las funciones necesarias para la recolección de mensajes y generación de contenido
const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const { collectMessages, getAvailableChannels, collectMessagesFromAllChannels } = require("./collector/discord-collector");
const { generateContent } = require("./processor/content-generator");
const { runGeneration } = require('./services/generationService');

//Importamos las rutas y el modelo de la base de datos
const userRoutes = require("./routes/userRoutes");
const regenerateRoutes = require("./routes/regenerateRoutes");
const publishRoutes = require("./routes/publishRoutes");
const draftRoutes = require("./routes/draftRoutes");
const generationRoutes = require("./routes/generationRoutes");
const communityFeedRoutes = require("./routes/communityFeedRoutes");
const sequelize = require("./config/database");

//Variables de entorno
const TOKEN = process.env.DISCORD_TOKEN; //el bot
const GUILD_ID = process.env.DISCORD_GUILD_ID; //id del server
const GEMINI_KEY = process.env.GEMINI_API;

//Creamos la aplicación de Express
const app = express();

//Configuramos los middlewares y las rutas
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
app.use("/user", userRoutes);
app.use("/api",publishRoutes);
app.use("/generation", generationRoutes);
app.use("/drafts", draftRoutes);
app.use("/api", regenerateRoutes);
app.use("/community-feed", communityFeedRoutes);

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
cron.schedule("0 16 * * 5", async () => {
    // 0-> minutos, 9-> hora, *-> valores nulos, 5-> dia de la semana en este caso viernes (0 = domingo, ..., 5 = viernes)

    try {
        await runGeneration();

    } catch (error) {

        console.error("Error en el cron:", error);
    }
});