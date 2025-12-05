require('dotenv').config();
require('reflect-metadata');

// Rest
const express = require('express');
// Servidor HTTP
const { createServer } = require('http');

// GraphQl
const { ApolloServer } = require('apollo-server-express');

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

    /* Apollo */
    server.applyMiddleware({ app, path: '/graphql' });
}
startGraphQL();

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
