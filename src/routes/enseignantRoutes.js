const express = require("express");
const EnseignantController = require("../controllers/EnseignantController");
const validateIdParam = require("../middelware/validate_params");

const router = express.Router();

router.get("/", EnseignantController.getAll);
router.get("/:id", validateIdParam,  EnseignantController.getById);
router.post("/", EnseignantController.create);
router.put("/:id", validateIdParam, EnseignantController.update);
router.delete("/:id", validateIdParam, EnseignantController.delete);

module.exports = router;
