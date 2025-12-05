const express = require('express');
const AppDataSource = require('../database/connection');
const Flight = require('../database/entities/Flight');

const flightsRouter = express.Router();

const flightRepo = AppDataSource.getRepository("Flight");

/* Obtener todas las reservas -> equivalente a query en GraphQl  */
flightsRouter.get('/reserves', async (req, res) => {
    try {
        const flights = await flightRepo.find();

        res.json(flights);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* Crear una nueva reserva de vuelo -> equivalente a mutation en GraphQl */
flightsRouter.post('/createReserve', async (req, res) => {
    try {
        const { droneId, status } = req.body;

        const newFlight = flightRepo.create({ droneId, status });
        await flightRepo.save(newFlight);

        res.status(201).json({ message: "Reserva creada", flight: newFlight });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* Obtener una reserva por ID */
flightsRouter.get('/:id', async (req, res) => {
    try {
        const flight = await flightRepo.findOneBy({ id: parseInt(req.params.id) });

        if (!flight) return res.status(404).json({ message: "Reserva no encontrada" });
        res.json(flight);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = flightsRouter;
