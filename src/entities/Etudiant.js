const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Etudiant",
  tableName: "etudiants",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nom: {
      type: "varchar",
      nullable: false,
    },
    prenom: {
      type: "varchar",
      nullable: false,
    },
    age: {
      type: "int",
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
  },
  relations: {
    classe: {
      type: "many-to-one",
      target: "Classe",
      joinColumn: { name: "classe_id" },
      nullable: true,
    },
  },
});
