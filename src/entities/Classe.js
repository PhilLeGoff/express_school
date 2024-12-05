const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Classe",
  tableName: "classes",
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
    niveau: {
      type: "varchar",
      nullable: false,
    },
  },
  relations: {
    etudiants: {
      type: "one-to-many",
      target: "Etudiant",
      inverseSide: "classe",
    },
    enseignantPrincipal: {
      type: "many-to-one",
      target: "Enseignant",
      joinColumn: { name: "enseignant_principal_id" },
      nullable: true,
    },
  },
});
