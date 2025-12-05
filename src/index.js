require('dotenv').config();
require('reflect-metadata');

// Rest
const express = require('express');
// Servidor HTTP
const { createServer } = require('http');
// WebSockets
const { Server } = require('socket.io');
// GraphQl
const { ApolloServer } = require('apollo-server-express');
// RabbitMQ
const amqp = require('amqplib');
// Conexión a Base de Datos
const AppDataSource = require('../src/database/connection');

// Importación de módulos
const flightRoutes = require('../src/api/flights.route');
const typeDefs = require('../src/graphql/schema');
const resolvers = require('../src/graphql/resolvers');

const app = express();
const httpServer = createServer(app);

/* Ruta para endpoints REST*/
app.use('/flights', express.json(), flightRoutes);

/* GraphQl */
async function startGraphQL() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
}
startGraphQL();

/* WebSocket */
/* const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("Cliente conectado vía WebSocket");

    // Ejemplo: enviar posición en vivo
    socket.emit("position", { droneId: 1, lat: -38.95, lng: -67.99 });

    // Ejemplo: chat simple
    socket.on("chat", (msg) => {
        console.log("Mensaje recibido:", msg);
        io.emit("chat", msg); // reenvía a todos los clientes
    });
}); */

/* Event-Driven */
/* async function connectBroker() {
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        const ch = await conn.createChannel();
        await ch.assertQueue('alerts');

        // Publicar ejemplo de alerta
        ch.sendToQueue('alerts', Buffer.from('Batería baja en dron #1'));

        // Consumir mensajes
        ch.consume('alerts', (msg) => {
            console.log("Alerta recibida:", msg.content.toString());
            ch.ack(msg);
        });
    } catch (err) {
        console.error("Error conectando a RabbitMQ:", err);
    }
}
connectBroker(); */

/* Base de Datos */
AppDataSource.initialize()
    .then(() => console.log("Conexión a MySQL establecida"))
    .catch((err) => console.error("Error Base de Datos:", err));

/* Servidor */
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`GraphQL corriendo en http://localhost:${PORT}/graphql`);
});
