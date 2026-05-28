# 📡 Módulo Collector — Discord Message Collector

> Módulo responsable de conectarse a Discord, extraer mensajes de un canal específico y retornarlos como datos estructurados.

---

## 📖 Descripción

Este módulo encapsula toda la lógica de interacción con la API de Discord:

1. Autenticar un bot en Discord
2. Acceder a un canal específico
3. Descargar los últimos 100 mensajes
4. Transformarlos a un formato limpio
5. Desconectar el bot

---

## 🔌 API

### `collectMessages(token, channelId)`

**Parámetros:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `token` | `string` | Token de autenticación del bot de Discord |
| `channelId` | `string` | ID del canal del cual extraer mensajes |

**Retorna:** `Promise<Array<MessageData>>`

```javascript
// Estructura de cada elemento del array
{
  author: string,     // Username del autor
  content: string,    // Texto del mensaje
  date: Date,         // Fecha de creación
  reactions: number   // Cantidad de tipos de reacciones distintas
}
```

**Ejemplo:**
```javascript
const { collectMessages } = require("./collector/discord-collector");
const messages = await collectMessages("BOT_TOKEN", "1239996015772307491");
```

---

## 🔄 Flujo Interno

```
collectMessages(token, channelId)
        │
        ▼
1. client.login(token)        → Autentica el bot
        │
        ▼
2. await ClientReady event    → Espera a que esté listo
        │
        ▼
3. channels.fetch(channelId)  → Busca el canal por ID
        │
        ▼
4. messages.fetch({ limit: 100 }) → Descarga últimos 100 mensajes
        │
        ▼
5. messages.map(...)          → Transforma a objetos simples
        │
        ▼
6. client.destroy()           → Cierra conexión con Discord
        │
        ▼
   return result[]
```

---

## 🔐 Permisos Requeridos (Intents)

| Intent | Constante | Propósito |
|--------|-----------|-----------|
| **Guilds** | `GatewayIntentBits.Guilds` | Ver los servidores |
| **Guild Messages** | `GatewayIntentBits.GuildMessages` | Acceder a mensajes |
| **Message Content** | `GatewayIntentBits.MessageContent` | Leer contenido (⚠️ privilegiado) |

> ⚠️ `MessageContent` es un **intent privilegiado** que debe activarse manualmente en el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications) → Bot → Privileged Gateway Intents.

---

## 🔍 Explicación del Código

### Imports (línea 5)

```javascript
const { Client, GatewayIntentBits, Events } = require("discord.js");
```
- **`Client`**: Clase que representa la conexión con Discord (el "bot").
- **`GatewayIntentBits`**: Enum de permisos que el bot declara al conectarse.
- **`Events`**: Enum de eventos que Discord emite (`ClientReady`, etc.).

### Cliente (líneas 7-13)

El `Client` se instancia **a nivel de módulo** con los 3 intents necesarios. Los intents se declaran al crear el cliente, no al conectarse.

### Login + Ready (líneas 17-25)

```javascript
await client.login(token);
await new Promise(resolve => {
    client.once(Events.ClientReady, () => { resolve(); });
});
```
- `login()` inicia la conexión pero resuelve antes de que el bot esté 100% listo.
- Se wrappea `ClientReady` en un `Promise` para poder hacer `await`.
- `once` (no `on`) asegura que el listener se ejecute una sola vez.

### Fetch (líneas 28-31)

- `channels.fetch(id)` → request a la API para obtener el canal.
- `messages.fetch({ limit: 100 })` → descarga hasta 100 mensajes (máximo por request).

### Map (líneas 34-39)

`messages` es una `Collection` (extiende `Map`). El `.map()` crea objetos planos con solo los 4 campos necesarios.

### Sobre `reactions`

`msg.reactions.cache.size` cuenta **tipos** de reacciones, no cantidad total:
- 5x 👍 + 3x ❤️ → `reactions = 2`
- Sin reacciones → `reactions = 0`

### Cleanup (línea 42)

`client.destroy()` cierra el WebSocket para que Node.js pueda terminar el proceso.

---

## ⚠️ Consideraciones

- **Límite de 100 mensajes**: Máximo por request de Discord. Para más, se necesitaría paginación con `before`.
- **Sin filtro de fecha**: Se traen los últimos 100 sin importar antigüedad.
- **Mensajes vacíos**: Mensajes con solo imágenes/stickers tendrán `content: ""`.
- **Cliente reutilizable**: Después de `destroy()`, el cliente no puede reconectarse sin crear uno nuevo.

---

## 📦 Dependencia

| Paquete | Uso |
|---------|-----|
| `discord.js` | `Client`, `GatewayIntentBits`, `Events` |
