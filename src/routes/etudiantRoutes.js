const express = require("express");
const EtudiantController = require("../controllers/EtudiantController");
const validateIdParam = require("../middelware/validate_params");

const router = express.Router();

router.get("/", EtudiantController.getAll);
router.get("/:id", validateIdParam, EtudiantController.getById);
router.post("/", EtudiantController.create);
router.put("/:id", validateIdParam, EtudiantController.update);
router.delete("/:id", validateIdParam, EtudiantController.delete);

module.exports = router;
