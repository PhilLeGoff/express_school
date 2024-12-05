const AppDataSource = require("../data-source");
const Etudiant = require("../entities/Etudiant");
const ClasseRepository = require("../repositories/ClasseRepository")
const Classe = require("../entities/Classe")

class EtudiantRepository {
  static async findAll() {
    try {
      const repository = AppDataSource.getRepository(Etudiant);
      return await repository.find({ relations: ["classe"] });
    } catch (error) {
      throw new Error("Failed to retrieve etudiants. " + error.message);
    }
  }

  static async findById(id) {
    try {
      const repository = AppDataSource.getRepository(Etudiant);
      const etudiant = await repository.findOne({
        where: { id },
        relations: ["classe"],
      });

      if (!etudiant) {
        throw new Error(`Etudiant with ID ${id} not found.`);
      }

      return etudiant;
    } catch (error) {
      throw new Error("Failed to retrieve etudiant. " + error.message);
    }
  }

  static async create(data, classe) {
    const repository = AppDataSource.getRepository(Etudiant);

    const etudiant = repository.create({
      ...data,
      classe,
    });

    return await repository.save(etudiant);
  }

  static async update(id, data) {
    console.log("data passed", data)
    const repository = AppDataSource.getRepository(Etudiant);

    const etudiant = await repository.findOne({ where: { id } });
    if (!etudiant) {
      throw new Error(`Etudiant with ID ${id} not found.`);
    }

    if (data.classe_id) {
      const classe = await ClasseRepository.findById(data.classe_id);

      if (!classe) {
        throw new Error(`Classe with ID ${data.classe_id} not found.`);
      }

      data.classe = classe;
    }

    const result = await repository.save({ ...etudiant, ...data });

    return result;
  }

  static async delete(id) {
    try {
      const repository = AppDataSource.getRepository(Etudiant);
      const result = await repository.delete(id);

      if (result.affected === 0) {
        throw new Error(`Etudiant with ID ${id} not found.`);
      }
    } catch (error) {
      throw new Error("Failed to delete etudiant. " + error.message);
    }
  }
}

module.exports = EtudiantRepository;
