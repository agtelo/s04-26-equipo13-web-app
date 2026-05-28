# 🤖 PruebaDS — Discord Content Pipeline

> Bot de Node.js que recolecta mensajes de un canal de Discord y genera borradores de contenido para **Newsletter**, **LinkedIn** y **Twitter** usando **Google Gemini AI**.

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Flujo de Datos](#-flujo-de-datos)
- [Módulos](#-módulos)
- [Formato de Salida](#-formato-de-salida)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Descripción General

**PruebaDS** es un pipeline de generación de contenido automatizado para la comunidad tech **TalentCircle**. El sistema funciona en dos etapas:

1. **Recolección**: Un bot de Discord se conecta a un canal específico y extrae los últimos 100 mensajes, incluyendo autor, contenido, fecha y cantidad de reacciones.
2. **Procesamiento**: Los mensajes recolectados se envían a **Google Gemini AI** con un prompt específico que genera 3 formatos de contenido listos para publicar.

El objetivo es automatizar la curación de contenido semanal de la comunidad, transformando conversaciones orgánicas en publicaciones profesionales.

---

## 🏗 Arquitectura

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Discord API   │────▶│   index.js        │────▶│   Gemini AI     │
│   (Canal)       │     │   (Orquestador)   │     │   (LLM)         │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                       │                        │
        │                       │                        │
        ▼                       ▼                        ▼
  discord-collector.js    Coordina flujo         content-generator.js
  - Login bot             Paso 1 → Paso 2        - Construye prompt
  - Fetch canal           Paso 2 → Paso 3        - Llama a Gemini
  - Fetch mensajes        Muestra resultados     - Parsea JSON
  - Logout bot
```

El proyecto sigue un patrón **pipeline secuencial** donde cada módulo tiene una responsabilidad única:

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| **Orquestación** | `src/index.js` | Coordina el flujo completo y muestra resultados |
| **Recolección** | `src/collector/discord-collector.js` | Conexión a Discord y extracción de mensajes |
| **Procesamiento** | `src/processor/content-generator.js` | Generación de contenido con IA |

---

## 🛠 Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **discord.js** | ^14.26.3 | SDK oficial para la API de Discord |
| **@google/generative-ai** | ^0.24.1 | SDK oficial de Google Gemini |
| **dotenv** | ^17.4.2 | Carga de variables de entorno desde `.env` |

---

## ✅ Requisitos Previos

Antes de ejecutar el proyecto necesitás:

1. **Node.js** v18 o superior instalado → [Descargar](https://nodejs.org/)
2. **Un bot de Discord** creado en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications):
   - Con los intents `GUILDS`, `GUILD_MESSAGES` y `MESSAGE_CONTENT` habilitados
   - Invitado a un servidor con permisos de lectura de mensajes
3. **Una API Key de Google Gemini** → [Google AI Studio](https://aistudio.google.com/apikey)

---

## 📦 Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd pruebaDS

# 2. Instalar dependencias
npm install
```

Esto instalará las 3 dependencias del proyecto: `discord.js`, `@google/generative-ai` y `dotenv`.

---

## ⚙ Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DISCORD_TOKEN=tu_token_de_bot_de_discord
GEMINI_API=tu_api_key_de_gemini
```

### Variables de Entorno

| Variable | Descripción | Dónde obtenerla |
|----------|-------------|-----------------|
| `DISCORD_TOKEN` | Token de autenticación del bot de Discord | [Discord Developer Portal](https://discord.com/developers/applications) → Bot → Token |
| `GEMINI_API` | API Key para Google Gemini | [Google AI Studio](https://aistudio.google.com/apikey) |

### Canal de Discord

El ID del canal está hardcodeado en `src/index.js` (línea 7):

```javascript
const CHANNEL_ID = "1239996015772307491";
```

> ⚠️ **Importante**: Si querés usar un canal diferente, cambiá este valor. Podés obtener el ID de un canal activando el **Modo Desarrollador** en Discord (Ajustes → Avanzado) y haciendo clic derecho sobre el canal → "Copiar ID del canal".

---

## 🚀 Uso

```bash
npm start
```

O directamente:

```bash
node src/index.js
```

### Salida esperada en consola:

```
Recolectando mensajes de Discord...
Bot conectado como: NombreDelBot#1234
Se recolectaron 100 mensajes
Generando borradores con Gemini...

=== NEWSLETTER ===
[Texto largo de 2-3 párrafos para newsletter]

=== LINKEDIN ===
[Texto de 1 párrafo con emojis para LinkedIn]

=== TWITTER ===
[Tweet de máximo 280 caracteres con hashtags]
```

---

## 📁 Estructura del Proyecto

```
pruebaDS/
├── .env                              # Variables de entorno (NO se sube a git)
├── .gitignore                        # Excluye node_modules/ y .env
├── package.json                      # Configuración del proyecto y dependencias
├── package-lock.json                 # Lock de versiones exactas
│
└── src/                              # Código fuente
    ├── index.js                      # 🎯 Punto de entrada / Orquestador
    │
    ├── collector/                    # Módulo de recolección de datos
    │   ├── README.md                 # Documentación del módulo collector
    │   └── discord-collector.js      # Lógica de conexión a Discord y extracción
    │
    └── processor/                    # Módulo de procesamiento con IA
        ├── README.md                 # Documentación del módulo processor
        └── content-generator.js      # Lógica de generación de contenido con Gemini
```

---

## 🔄 Flujo de Datos

```
                    ┌───────────────────────────────────────────────┐
                    │              index.js (main)                  │
                    │                                               │
                    │  1. Lee variables de entorno (.env)           │
                    │  2. Llama a collectMessages()                 │
                    │  3. Llama a generateContent()                 │
                    │  4. Imprime los 3 borradores                 │
                    └───────────────────────────────────────────────┘
                              │                    │
                     Paso 1   │                    │  Paso 2
                              ▼                    ▼
               ┌──────────────────┐    ┌──────────────────────┐
               │ discord-collector│    │  content-generator    │
               │                  │    │                       │
               │ IN:  token,      │    │ IN:  messages[],      │
               │      channelId   │    │      apiKey           │
               │                  │    │                       │
               │ OUT: messages[]  │    │ OUT: { newsletter,    │
               │  [{              │    │        linkedin,      │
               │    author,       │    │        twitter }      │
               │    content,      │    │                       │
               │    date,         │    └──────────────────────┘
               │    reactions     │
               │  }]              │
               └──────────────────┘
```

### Detalle paso a paso:

1. **`index.js`** carga las variables `DISCORD_TOKEN` y `GEMINI_API` desde `.env` usando `dotenv`
2. **`index.js`** llama a `collectMessages(TOKEN, CHANNEL_ID)` que:
   - Conecta el bot a Discord con el token
   - Espera el evento `ClientReady`
   - Busca el canal por su ID
   - Descarga los últimos 100 mensajes
   - Mapea cada mensaje a un objeto `{ author, content, date, reactions }`
   - Desconecta el bot
   - Retorna el array de mensajes
3. **`index.js`** pasa el array a `generateContent(messages, GEMINI_KEY)` que:
   - Crea un cliente de Gemini con el modelo `gemini-3-flash-preview`
   - Construye un prompt con los mensajes formateados
   - Envía el prompt al LLM
   - Limpia y parsea la respuesta JSON
   - Retorna un objeto con los 3 borradores
4. **`index.js`** imprime los borradores en consola separados por formato

---

## 📦 Módulos

### `src/collector/discord-collector.js`

Módulo de recolección de datos de Discord. [Ver documentación detallada →](src/collector/README.md)

**Función exportada**: `collectMessages(token, channelId) → Promise<Array>`

### `src/processor/content-generator.js`

Módulo de generación de contenido con Gemini AI. [Ver documentación detallada →](src/processor/README.md)

**Función exportada**: `generateContent(messages, apiKey) → Promise<Object>`

---

## 📤 Formato de Salida

La función `generateContent` retorna un objeto con esta estructura:

```json
{
  "newsletter": "Texto largo de 2-3 párrafos con tono profesional...",
  "linkedin": "Texto de 1 párrafo con emojis profesionales 🚀...",
  "twitter": "Tweet corto con #hashtags (máx 280 chars)"
}
```

| Campo | Formato | Tono | Longitud |
|-------|---------|------|----------|
| `newsletter` | Largo, 2-3 párrafos | Profesional | ~500-800 palabras |
| `linkedin` | Medio, 1 párrafo | Profesional con emojis | ~100-200 palabras |
| `twitter` | Corto, 1 oración | Directo con hashtags | Máximo 280 caracteres |

---

## 🔧 Troubleshooting

### Error: `Used disallowed intents`
El bot no tiene los intents necesarios activados en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications). Activá:
- `SERVER MEMBERS INTENT`
- `MESSAGE CONTENT INTENT`

### Error: `Invalid token`
El token en `.env` es incorrecto o fue regenerado. Generá uno nuevo en el portal de desarrolladores.

### Error: `Unknown Channel`
El `CHANNEL_ID` en `index.js` no existe o el bot no tiene acceso a ese canal. Verificá que el bot esté invitado al servidor correcto.

### Error: `API key not valid`
La API key de Gemini es incorrecta o fue revocada. Generá una nueva en [Google AI Studio](https://aistudio.google.com/apikey).

### Error al parsear JSON de Gemini
Si Gemini retorna texto fuera del formato JSON esperado, el `JSON.parse` fallará. Esto puede pasar esporádicamente. Volvé a ejecutar el script.

---

## 📝 Notas

- El sistema está diseñado como un **script de ejecución única** (no es un servidor persistente). Se ejecuta, genera los borradores y termina.
- El bot se conecta y desconecta de Discord en cada ejecución, no queda activo escuchando.
- El modelo de Gemini usado es `gemini-3-flash-preview` (modelo rápido y eficiente).
- El módulo system usa **CommonJS** (`require`/`module.exports`) según la config `"type": "commonjs"` en `package.json`.
