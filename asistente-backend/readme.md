# API Asistente - Clientes y Productos

Backend simple en Node.js con Express y almacenamiento en archivos JSON.

## Configuración de WhatsApp

Para habilitar el envío de mensajes de WhatsApp se utilizan las credenciales de Twilio.
Crea un archivo `.env` en `asistente-backend` con las siguientes variables:

```
TWILIO_ACCOUNT_SID=TU_SID
TWILIO_AUTH_TOKEN=TU_TOKEN
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

`TWILIO_WHATSAPP_FROM` debe ser el número habilitado en Twilio, incluyendo el prefijo `whatsapp:`.

### Enviar mensajes

`POST /mensajes`

Body JSON:

```json
{
  "destino": "+5491112345678",
  "mensaje": "Hola desde la API"
}
```

Si las credenciales son válidas se enviará el mensaje y se devolverá el `sid` generado por Twilio.

## Endpoints

---

### 📁 CLIENTES

**GET** `/clientes`  
Devuelve todos los clientes.

**POST** `/clientes`
Agrega un nuevo cliente.
Body JSON:

```json
{
  "nombre": "Juan Pérez",
  "telefono": "123456789"
}
```

**PUT** `/clientes/:id`
Actualiza un cliente existente enviando solo los campos a modificar.

**POST** `/clientes/:id/mensaje`
Envía un mensaje de WhatsApp al cliente indicado. Body JSON:

```json
{
  "mensaje": "Hola!"
}
```

**DELETE** `/clientes/:id`
Elimina un cliente por su ID.

---

### 📁 PRODUCTOS

**GET** `/productos`
Obtiene todos los productos registrados.

**POST** `/productos`
Agrega un nuevo producto.

**PUT** `/productos/:id`
Edita un producto existente.

**DELETE** `/productos/:id`
Elimina un producto por su ID.

## Puesta en marcha

Instala dependencias en `asistente-backend` y ejecuta:

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`.
