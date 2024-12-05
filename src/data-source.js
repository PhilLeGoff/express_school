const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "transcendence",
  password: "transcendence",
  database: "school",
  synchronize: true,
  logging: true,
  entities: [
    require("./entities/Etudiant"),
    require("./entities/Enseignant"),
    require("./entities/Classe")
  ]
});

// Initialize the data source
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

module.exports = AppDataSource;
