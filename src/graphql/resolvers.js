const AppDataSource = require('../database/connection');

const flightRepo = AppDataSource.getRepository("Flight");

const resolvers = {
    Query: {
        /* Devuelve toda la lista de vuelos */
        flights: async (_, args) => {
            if (args.status) {
                return await flightRepo.find({ where: { status: args.status } });
            }
            return await flightRepo.find();
        },

        /* Devuelve un vuelo específico por ID */
        flight: async (_, { id }) => {
            return await flightRepo.findOneBy({ id: parseInt(id) });
        }
    },
    Mutation: {
        /* Crea un nuevo vuelo en la base de datos */
        createFlight: async (_, { droneId, status }) => {
            const newFlight = flightRepo.create({ droneId, status });
            await flightRepo.save(newFlight);
            return newFlight;
        },
    },
};

module.exports = resolvers;
