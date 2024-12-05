const EnseignantRepository = require("../repositories/EnseignantRepository");
const ClasseRepository = require("../repositories/ClasseRepository");

class EnseignantService {
  static async getAll() {
    return await EnseignantRepository.findAll();
  }

  static async getById(id) {
    return await EnseignantRepository.findById(id);
  }

  static async create(data) {
    return await EnseignantRepository.create(data);
  }

  static async update(id, data) {
    return await EnseignantRepository.update(id, data);
  }

  static async delete(id) {
    await ClasseRepository.clearEnseignantPrincipal(id);

    const result = await EnseignantRepository.delete(id);

    if (!result) {
      return null
    }

    return result;
  }
}

module.exports = EnseignantService;
