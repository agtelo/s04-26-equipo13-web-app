# 🧠 Módulo Processor — Content Generator con Gemini AI

> Módulo que recibe mensajes de Discord y genera borradores de contenido para Newsletter, LinkedIn y Twitter usando Google Gemini AI.

---

## 📖 Descripción

Este módulo se encarga del procesamiento inteligente de los datos recolectados:

1. Recibe un array de mensajes de Discord
2. Los formatea como texto plano para un prompt de IA
3. Envía el prompt a Google Gemini (`gemini-3-flash-preview`)
4. Parsea la respuesta JSON
5. Retorna los 3 borradores de contenido

---

## 🔌 API

### `generateContent(messages, apiKey)`

**Parámetros:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `messages` | `Array<MessageData>` | Array de mensajes (output de `collectMessages`) |
| `apiKey` | `string` | API Key de Google Gemini |

**Estructura esperada de cada mensaje:**

```javascript
{
  author: string,
  content: string,
  reactions: number
}
```

**Retorna:** `Promise<Object>`

```javascript
{
  newsletter: string,  // 2-3 párrafos, tono profesional
  linkedin: string,    // 1 párrafo, profesional con emojis
  twitter: string      // Máximo 280 caracteres, con hashtags
}
```

**Ejemplo:**
```javascript
const { generateContent } = require("./processor/content-generator");
const drafts = await generateContent(messages, "GEMINI_API_KEY");
console.log(drafts.newsletter);
console.log(drafts.linkedin);
console.log(drafts.twitter);
```

---

## 🔄 Flujo Interno

```
generateContent(messages, apiKey)
        │
        ▼
1. new GoogleGenerativeAI(apiKey)   → Crea cliente de Gemini
        │
        ▼
2. getGenerativeModel(...)          → Selecciona modelo gemini-3-flash-preview
        │
        ▼
3. messages.map(...)                → Formatea mensajes como texto plano
        │
        ▼
4. Construye el prompt              → Instrucciones + mensajes formateados
        │
        ▼
5. model.generateContent(prompt)    → Envía al LLM
        │
        ▼
6. Limpia markdown de la respuesta  → Remueve ```json``` wrappers
        │
        ▼
7. JSON.parse(clean)                → Parsea a objeto JS
        │
        ▼
   return { newsletter, linkedin, twitter }
```

---

## 📝 El Prompt

El prompt tiene un rol de **editor de contenido de TalentCircle** y recibe los mensajes formateados así:

```
- juan dijo: "Hola a todos!" (2 reacciones)
- maria dijo: "¿Alguien probó Bun?" (5 reacciones)
```

Le pide generar 3 formatos:

| Formato | Longitud | Tono | Restricción |
|---------|----------|------|-------------|
| **Newsletter** | 2-3 párrafos | Profesional | Formato largo |
| **LinkedIn** | 1 párrafo | Profesional con emojis | Formato medio |
| **Twitter** | 1 oración | Directo con hashtags | Máximo 280 caracteres |

La respuesta debe ser **solo JSON**, sin texto adicional.

---

## 🔍 Explicación del Código

### Import (línea 1)

```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");
```

Importa la clase principal del SDK de Google Gemini.

### Creación del modelo (líneas 5-6)

```javascript
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
```

- `GoogleGenerativeAI` es la clase de acceso al servicio, autenticada con la API key.
- `gemini-3-flash-preview` es el modelo seleccionado: rápido y eficiente para generación de texto.

### Formateo de mensajes (líneas 9-11)

```javascript
const messagesText = messages
    .map(msg => `- ${msg.author} dijo: "${msg.content}" (${msg.reactions} reacciones)`)
    .join("\n");
```

Cada mensaje se convierte a una línea con formato:
`- [autor] dijo: "[contenido]" ([N] reacciones)`

Luego se unen con saltos de línea para formar el texto del prompt.

### Construcción del prompt (líneas 14-33)

Template literal multilínea que incluye:
- Rol del LLM ("editor de contenido de TalentCircle")
- Los mensajes formateados
- Instrucciones para cada formato
- Estructura JSON esperada de respuesta
- Instrucción de responder SOLO con JSON

### Llamada al LLM (líneas 36-37)

```javascript
const result = await model.generateContent(prompt);
const response = result.response.text();
```

`generateContent` envía el prompt y retorna un objeto `GenerateContentResult`. Se extrae el texto con `.response.text()`.

### Limpieza y parseo (líneas 40-41)

```javascript
const clean = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
const drafts = JSON.parse(clean);
```

Gemini a veces envuelve el JSON en bloques de código markdown (` ```json ... ``` `). Las regex remueven estos wrappers antes de parsear.

---

## ⚙️ Modelo de IA

| Propiedad | Valor |
|-----------|-------|
| **Proveedor** | Google Gemini |
| **Modelo** | `gemini-3-flash-preview` |
| **Tipo** | Generación de texto |
| **Formato de respuesta** | JSON |

---

## ⚠️ Consideraciones

- **Parseo frágil**: Si Gemini no responde en JSON válido, `JSON.parse` lanzará un error. No hay retry ni fallback.
- **Costo de API**: Cada ejecución consume tokens de la API de Gemini (generalmente dentro del free tier para este volumen).
- **Contenido variable**: El LLM puede generar contenido ligeramente diferente en cada ejecución con los mismos datos.
- **Mensajes vacíos**: Si hay mensajes con `content: ""`, aparecerán como `dijo: ""` en el prompt, lo cual no aporta contexto útil.
- **Sin streaming**: La respuesta se recibe completa, no en streaming.

---

## 📦 Dependencia

| Paquete | Uso |
|---------|-----|
| `@google/generative-ai` | `GoogleGenerativeAI` — SDK de Google Gemini |
