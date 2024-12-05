const express = require("express");
const ClasseController = require("../controllers/ClasseController");
const validateIdParam = require("../middelware/validate_params");

const router = express.Router();

router.get("/", ClasseController.getAll);
router.get("/:id/details", validateIdParam, ClasseController.getById);
router.post("/", ClasseController.create);
router.put("/:id", validateIdParam, ClasseController.update);
router.delete("/:id", validateIdParam, ClasseController.delete);

module.exports = router;
