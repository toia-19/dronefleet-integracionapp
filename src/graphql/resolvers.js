const AppDataSource = require('../database/connection');

const resolvers = {
    Query: {
        flights: async (_, args) => {
            const flightRepo = AppDataSource.getRepository("Flight");
            if (args.status) {
                return await flightRepo.find({ where: { status: args.status } });
            }
            return await flightRepo.find();
        },
        flight: async (_, { id }) => {
            const flightRepo = AppDataSource.getRepository("Flight");
            return await flightRepo.findOneBy({ id: parseInt(id) });
        }
    },
    Mutation: {
        createFlight: async (_, { droneId, status }) => {
            const flightRepo = AppDataSource.getRepository("Flight");
            const newFlight = flightRepo.create({ droneId, status });
            await flightRepo.save(newFlight);
            return newFlight;
        },
    },
};

module.exports = resolvers;
