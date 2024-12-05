const EtudiantRepository = require("../repositories/EtudiantRepository");
const ClasseRepository = require("../repositories/ClasseRepository");
const Etudiant = require("../entities/Etudiant");
const Classe = require("../entities/Classe")

class EtudiantService {
  static async getAll() {
    return await EtudiantRepository.findAll();
  }

  static async getById(id) {
    return await EtudiantRepository.findById(id);
  }

  static async create(data) {
    try {

      const classe = await ClasseRepository.findStudentClass(data.classe_id);

      return await EtudiantRepository.create(data, classe);
    } catch (error) {
      throw new Error("Failed to create etudiant. " + error.message);
    }
  }

  static async update(id, data) {
    return await EtudiantRepository.update(id, data)
  }

  static async delete(id) {
    return await EtudiantRepository.delete(id);
  }

  static async delete(id) {
    return await EtudiantRepository.delete(id);
  }
}

module.exports = EtudiantService;
