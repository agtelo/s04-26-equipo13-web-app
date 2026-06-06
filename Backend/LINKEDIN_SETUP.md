# LinkedIn Publishing Setup

## 1. Obtener tu LinkedIn Personal ID

### Opción A: Desde la API de LinkedIn (RECOMENDADO)
1. Abre en el navegador: https://www.linkedin.com/voyager/api/me
2. Busca el campo `"id"` en la respuesta JSON
3. Tendrá este formato: `"id": "urn:li:person:123456789"`
4. Extrae el número: `123456789`

### Opción B: Herramienta online
- Ve a: https://linkedin-user-id.com/
- Pega tu perfil: https://www.linkedin.com/in/alan-gabriel-telo

### Actualizar .env
```env
LINKEDIN_USER_ID=123456789
```

---

## 2. Obtener un Access Token válido

### Opción A: Completar OAuth Flow (RECOMENDADO para producción)
1. Frontend redirige a: `GET /api/auth/linkedin`
2. LinkedIn pide permisos
3. Usuario autoriza
4. Backend almacena el token automáticamente
5. Usuario puede publicar sin enviar token manualmente

### Opción B: Access Token de Testing (solo para desarrollo)
1. Ve a LinkedIn Developer Portal: https://www.linkedin.com/developers/apps
2. Selecciona tu app (Distiller)
3. Ve a pestaña "Auth"
4. En "Generate access token" → haz click
5. Copia el token (válido por 24 horas)
6. Úsalo en los requests de publish

---

## 3. Publicar un Draft en LinkedIn

### Flujo Actual:
```
User clicks "Approve" en draft LinkedIn
    ↓
Frontend envía: POST /api/publish/linkedin
    Body: { content: "...", accessToken?: "..." }
    ↓
Backend verifica:
    - ¿Existe LINKEDIN_USER_ID? (obtiene personId)
    - ¿Existe accessToken? (obtenido de OAuth o parámetro)
    ↓
Si falta accessToken:
    Error: "Please authenticate with LinkedIn first"
    ↓
Backend publica post en LinkedIn API
    ↓
Post aparece en tu perfil
```

### Casos de Uso:

#### Caso 1: User completó OAuth (mejor)
```bash
POST /api/publish/linkedin
{
  "content": "Mi post aquí"
  # Sin accessToken - backend lo obtiene de la sesión
}
```

#### Caso 2: User usa token de testing
```bash
POST /api/publish/linkedin
{
  "content": "Mi post aquí",
  "accessToken": "AQEa123...xyz" # Token de 24h desde Developer Portal
}
```

---

## 4. Troubleshooting

### Error: "LinkedIn User ID not configured"
- Solución: Actualizar `.env` con `LINKEDIN_USER_ID=123456789`

### Error: "LinkedIn authentication required"
- Solución: 
  - Completar OAuth flow: https://localhost:4000/api/auth/linkedin
  - O pasar accessToken válido en el request

### Error: "401 Unauthorized"
- El accessToken expiró (24h de validez)
- Obtener uno nuevo desde Developer Portal o completar OAuth nuevamente

---

## 5. Próximos Pasos (Production)

- [ ] Guardar LinkedIn tokens en base de datos (no en memoria)
- [ ] Asociar token a usuario autenticado en Distiller
- [ ] Refresh token automático cuando expire
- [ ] UI en frontend: "Connect LinkedIn" button
- [ ] Mostrar estado: "Connected ✓" / "Not connected"
