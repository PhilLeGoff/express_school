const EnseignantService = require("../services/EnseignantService");
const { validateEnseignant } = require("../middelware/validate_bodies");

class EnseignantController {
  static async getAll(req, res) {
    try {
      const enseignants = await EnseignantService.getAll();
      if (!enseignants.length) {
        return res.status(404).json({ error: "No enseignants found." });
      }
      res.json(enseignants);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve enseignants." });
    }
  }

  static async getById(req, res) {
    try {
      const enseignant = await EnseignantService.getById(req.params.id);
      if (!enseignant) {
        return res.status(404).json({ error: `Enseignant with ID ${req.params.id} not found.` });
      }
      res.json(enseignant);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve the enseignant." });
    }
  }

  static async create(req, res) {
    const { valid, errors } = validateEnseignant(req.body);
  
    if (!valid) {
      return res.status(400).json({
        error: "Invalid request body.",
        details: errors,
      });
    }

    try {
      const enseignant = await EnseignantService.create(req.body);
      res.status(201).json(enseignant);
    } catch (error) {
      res.status(400).json({ error: "Failed to create enseignant. Ensure all required fields are valid." });
    }
  }

  static async update(req, res) {
    const { valid, errors } = validateEnseignant(req.body);
  
    if (!valid) {
      return res.status(400).json({
        error: "Invalid request body.",
        details: errors,
      });
    }

    try {
      const enseignant = await EnseignantService.update(req.params.id, req.body);
      if (!enseignant) {
        return res.status(404).json({ error: `Enseignant with ID ${req.params.id} not found.` });
      }
      res.json(enseignant);
    } catch (error) {
      res.status(400).json({ error: "Failed to update enseignant. Ensure all required fields are valid." });
    }
  }

  static async delete(req, res) {
    try {
      const result = await EnseignantService.delete(req.params.id);
      console.log("result")
      if (!result) {
        return res.status(404).json({ error: `Enseignant with ID ${req.params.id} not found.` });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete enseignant." });
    }
  }
}

module.exports = EnseignantController;
