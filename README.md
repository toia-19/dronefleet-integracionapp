# Integración de Aplicaciones

Proyecto final de **Integración de Aplicaciones**, Desarrollo de Software Full Stack II

---

## Tecnologías Utilizadas
- **Node.js** (entorno de ejecución)
- **Express** (API REST)
- **Apollo Server (GraphQL)** (consultas complejas)
- **TypeORM + MySQL (Laragon)** (persistencia de datos)
- **dotenv** (gestión de variables de entorno)
- **nodemon** (recarga automática en desarrollo)

## Instalación
1. **Clona el repositorio**
```bash
https://github.com/toia-19/dronefleet-integracionapp.git
cd dronefleet-integracionapp
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Crea un archivo .env en la raíz del proyecto:**
```bash
PORT=3000
DB_HOST=localhost
DB_USER=tu_user
DB_PASS=tu_password
DATABASE=dronefleet
RABBITMQ_URL=amqp://localhost
```

4. **Ejecuta la aplicación**
```bash
`npx nodemon src/index.js` - Ejecuta la aplicación
```
---

## Endpoints principales
1. **Creación de una nueva reserva**<br>
**Op1 - GraphQl:**
```bash
POST: http://localhost:3000/graphql
BODY (GraphQL):
mutation {
  createFlight(droneId: 1, status: "pending") {
    id
    droneId
    status
    createdAt
  }
}
```

**Op2 - REST:**
```bash
POST: http://localhost:3000/flights/createReserve
BODY (JSON):
{
  "droneId": 3,
  "status": "pending"
}
```

2. **Obtener todos los vuelos en estado "pendiente"**<br>
**Op1 - GraphQl:**
```bash
POST: http://localhost:3000/graphql
BODY (GraphQL):
query {
  flights(status: "pending") {
    id
    droneId
    status
    createdAt
  }
}
```

**Op2 - REST:**
```bash
GET: http://localhost:3000/flights/reserves
```

3. **Obtener reserva por ID**<br>
**Op1 - GraphQl:**
```bash
POST: http://localhost:3000/graphql
BODY (GraphQL):
query {
  flight(id: 1) {
    id
    droneId
    status
    createdAt
  }
}

```

**Op2 - REST:**
```bash
GET: http://localhost:3000/flights/1
```

---
## Diagrama ASCII
![MER](/src/assets/diagrama-ascii.png)