const AppDataSource = require("../data-source");
const Enseignant = require("../entities/Enseignant");

class EnseignantRepository {
  static async findAll() {
    try {
      const repository = AppDataSource.getRepository(Enseignant);
      return await repository.find();
    } catch (error) {
      throw new Error("Failed to retrieve enseignants. " + error.message);
    }
  }

  static async findById(id) {
    try {
      const repository = AppDataSource.getRepository(Enseignant);
      const enseignant = await repository.findOne({ where: { id } });

      if (!enseignant) {
        return null
      }

      return enseignant;
    } catch (error) {
      throw new Error("Failed to retrieve enseignant. " + error.message);
    }
  }

  static async create(data) {
    try {
      const repository = AppDataSource.getRepository(Enseignant);
      const enseignant = repository.create(data);
      return await repository.save(enseignant);
    } catch (error) {
      throw new Error("Failed to create enseignant. " + error.message);
    }
  }

  static async update(id, data) {
    try {
      const repository = AppDataSource.getRepository(Enseignant);
      const result = await repository.update(id, data);

      if (result.affected === 0) {
        throw new Error(`Enseignant with ID ${id} not found.`);
      }

      return await repository.findOne({ where: { id } });
    } catch (error) {
      throw new Error("Failed to update enseignant. " + error.message);
    }
  }

  static async delete(id) {
    try {
      const repository = AppDataSource.getRepository(Enseignant);
      const result = await repository.delete(id);
      console.log("result", result)

      if (result.affected === 0) {
        return null
      }
      
      return { success: true, message: `Enseignant with ID ${id} successfully deleted.` };
    } catch (error) {
      throw new Error("Failed to delete enseignant. " + error.message);
    }
  }
}

module.exports = EnseignantRepository;
