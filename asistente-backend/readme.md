# API Asistente - Clientes y Productos

Backend simple en Node.js con Express y almacenamiento en archivos JSON.

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
