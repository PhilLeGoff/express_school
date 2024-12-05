const AppDataSource = require("../data-source");
const Classe = require("../entities/Classe");
const Etudiant = require("../entities/Etudiant");

class ClasseRepository {
    static async findAll() {
        try {
            const repository = AppDataSource.getRepository(Classe);
            return await repository.find({
                relations: ["enseignantPrincipal", "etudiants"],
            });
        } catch (error) {
            throw new Error("Failed to retrieve classes. " + error.message);
        }
    }

    static async findById(id) {
        try {
            const repository = AppDataSource.getRepository(Classe);
            const classe = await repository.findOne({
                where: { id },
                relations: ["enseignantPrincipal", "etudiants"],
            });

            if (!classe) {
                throw new Error(`Classe with ID ${id} not found.`);
            }

            return classe;
        } catch (error) {
            throw new Error("Failed to retrieve classe. " + error.message);
        }
    }

    static async findStudentClass(classeId) {
      console.log("classeId", classeId)
      const classe = await this.findById(classeId);
      
      if (!classe) {
        throw new Error(`Classe with ID ${classeId} not found.`);
      }
      console.log("classe found", classe)
  
      return classe;
    }

    static async create(data) {
        try {
            const repository = AppDataSource.getRepository(Classe);
            const classe = repository.create(data);
            return await repository.save(classe);
        } catch (error) {
            throw new Error("Failed to create classe. " + error.message);
        }
    }

    static async update(id, data) {
        try {
            const repository = AppDataSource.getRepository(Classe);
            const result = await repository.update(id, data);

            if (result.affected === 0) {
                throw new Error(`Classe with ID ${id} not found.`);
            }

            return await repository.findOne({ where: { id } });
        } catch (error) {
            throw new Error("Failed to update classe. " + error.message);
        }
    }

    static async delete(id) {
      const classeRepository = AppDataSource.getRepository(Classe);
      const etudiantRepository = AppDataSource.getRepository(Etudiant);
  
      await etudiantRepository
        .createQueryBuilder()
        .update(Etudiant)
        .set({ classe: null })
        .where("classe_id = :id", { id })
        .execute();
  
      const result = await classeRepository.delete(id);
  
      if (result.affected === 0) {
        throw new Error(`Classe with ID ${id} not found.`);
      }
  
      return { success: true, message: `Classe with ID ${id} successfully deleted.` };
    }

    static async clearEnseignantPrincipal(enseignantId) {
        const repository = AppDataSource.getRepository(Classe);

        try {
            await repository
                .createQueryBuilder()
                .update(Classe)
                .set({ enseignantPrincipal: null })
                .where("enseignant_principal_id = :id", { id: enseignantId })
                .execute();
        } catch (error) {
            throw new Error(
                `Failed to clear enseignant_principal for Enseignant ID ${enseignantId}. ${error.message}`
            );
        }
    }
}

module.exports = ClasseRepository;
