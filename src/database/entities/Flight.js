const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Flight",
    tableName: "flight",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        droneId: {
            type: "int",
        },
        status: {
            type: "varchar",
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
    },
});
