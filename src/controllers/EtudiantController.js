const EtudiantService = require("../services/EtudiantService");
const { validateEtudiant } = require("../middelware/validate_bodies");

class EtudiantController {
  static async getAll(req, res) {
    try {
      const etudiants = await EtudiantService.getAll();
      if (!etudiants.length) {
        return res.status(404).json({ error: "No etudiants found." });
      }
      res.json(etudiants);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve etudiants." });
    }
  }

  static async getById(req, res) {
    try {
      const etudiant = await EtudiantService.getById(req.params.id);
      if (!etudiant) {
        return res.status(404).json({ error: `Etudiant with ID ${req.params.id} not found.` });
      }
      res.json(etudiant);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve the etudiant." });
    }
  }

  static async create(req, res) {
    const { valid, errors } = validateEtudiant(req.body);
  
    if (!valid) {
      return res.status(400).json({
        error: "Invalid request body.",
        details: errors,
      });
    }

    try {
      const etudiant = await EtudiantService.create(req.body);
      console.log("etudiant", etudiant)
      res.status(201).json(etudiant);
    } catch (error) {
      res.status(400).json({ error: "Failed to create etudiant. Ensure all required fields are valid." });
    }
  }

  static async update(req, res) {
    const { valid, errors } = validateEtudiant(req.body);
  
    if (!valid) {
      return res.status(400).json({
        error: "Invalid request body.",
        details: errors,
      });
    }

    try {
      const etudiant = await EtudiantService.update(req.params.id, req.body);
      if (!etudiant) {
        return res.status(404).json({ error: `Etudiant with ID ${req.params.id} not found.` });
      }
      res.json(etudiant);
    } catch (error) {
      res.status(400).json({ error: "Failed to update etudiant. Ensure all required fields are valid." });
    }
  }

  static async delete(req, res) {
    try {
      const result = await EtudiantService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({ error: `Etudiant with ID ${req.params.id} not found.` });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete etudiant." });
    }
  }
}

module.exports = EtudiantController;
