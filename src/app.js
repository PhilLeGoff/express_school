const express = require("express");
const AppDataSource = require("./data-source");
const etudiantRoutes = require("./routes/etudiantRoutes");
const enseignantRoutes = require("./routes/enseignantRoutes");
const classeRoutes = require("./routes/classeRoutes");

const app = express();
app.use(express.json());

// Verify TypeORM connection
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

// Default route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// API routes
app.use("/etudiants", etudiantRoutes);
app.use("/enseignants", enseignantRoutes);
app.use("/classes", classeRoutes);

module.exports = app;
