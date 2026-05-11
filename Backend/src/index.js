require("dotenv").config();

const { collectMessages, getAvailableChannels } = require("./collector/discord-collector");
const { generateContent } = require("./processor/content-generator");


const TOKEN = process.env.DISCORD_TOKEN; //el bot
const CHANNEL_ID = "1498678945812447389";
const GUILD_ID = process.env.DISCORD_GUILD_ID; //id del server
const GEMINI_KEY = process.env.GEMINI_API;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

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

main();