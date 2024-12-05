const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Enseignant",
  tableName: "enseignants",
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
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    matiere: {
      type: "varchar",
      nullable: false,
    },
  },
  relations: {
    classes: {
      type: "one-to-many",
      target: "Classe",
      inverseSide: "enseignantPrincipal",
    },
  },
});
