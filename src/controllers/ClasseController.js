const ClasseService = require("../services/ClasseService");
const { validateClasse } = require("../middelware/validate_bodies");

class ClasseController {
  static async getAll(req, res) {
    try {
      const classes = await ClasseService.getAll();
      if (!classes.length) {
        return res.status(404).json({ error: "No classes found." });
      }
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve classes." });
    }
  }

  static async getById(req, res) {
    try {
      const classe = await ClasseService.getById(req.params.id);
      if (!classe) {
        return res.status(404).json({ error: `Classe with ID ${req.params.id} not found.` });
      }
      res.json(classe);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve the classe." });
    }
  }

  static async create(req, res) {
    const { valid, errors } = validateClasse(req.body);
  
    if (!valid) {
      return res.status(400).json({
        error: "Invalid request body.",
        details: errors,
      });
    }
  
    try {
      const classe = await ClasseService.create(req.body);
      res.status(201).json(classe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    const { valid, errors } = validateClasse(req.body);
  
    if (!valid) {
      return res.status(400).json({
        error: "Invalid request body.",
        details: errors,
      });
    }

    try {
      const classe = await ClasseService.update(req.params.id, req.body);
      if (!classe) {
        return res.status(404).json({ error: `Classe with ID ${req.params.id} not found.` });
      }
      res.json(classe);
    } catch (error) {
      res.status(400).json({ error: "Failed to update classe. Ensure all required fields are valid." });
    }
  }

  static async delete(req, res) {
    try {
      const result = await ClasseService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({ error: `Classe with ID ${req.params.id} not found.` });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete classe." });
    }
  }
}

module.exports = ClasseController;
