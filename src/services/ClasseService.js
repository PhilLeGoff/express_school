const ClasseRepository = require("../repositories/ClasseRepository");

class ClasseService {
  static async getAll() {
    return await ClasseRepository.findAll();
  }

  static async getById(id) {
    return await ClasseRepository.findById(id);
  }

  static async create(data) {
    return await ClasseRepository.create(data);
  }

  static async update(id, data) {
    return await ClasseRepository.update(id, data);
  }

  static async delete(id) {
    return await ClasseRepository.delete(id);
  }
}

module.exports = ClasseService;
