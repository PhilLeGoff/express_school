const validateClasse = (body) => {
    const errors = [];

    if (!body.nom || typeof body.nom !== "string") {
        errors.push({
            field: "nom",
            message: "Field 'nom' is required and must be a string.",
        });
    }

    if (!body.niveau || typeof body.niveau !== "string") {
        errors.push({
            field: "niveau",
            message: "Field 'niveau' is required and must be a string.",
        });
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    return { valid: true };
};

const validateEtudiant = (body) => {
    const errors = [];

    if (!body.nom || typeof body.nom !== "string") {
        errors.push({
            field: "nom",
            message: "Field 'nom' is required and must be a string.",
        });
    }

    if (!body.prenom || typeof body.prenom !== "string") {
        errors.push({
            field: "prenom",
            message: "Field 'prenom' is required and must be a string.",
        });
    }

    if (!body.age || typeof body.age !== "number" || body.age <= 0) {
        errors.push({
            field: "age",
            message: "Field 'age' is required and must be a positive number.",
        });
    }

    if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
        errors.push({
            field: "email",
            message:
                "Field 'email' is required and must be a valid email address.",
        });
    }

    if (!body.classe_id || typeof body.classe_id !== "number") {
        errors.push({
            field: "classe_id",
            message:
                "Field 'classe_id' is required and must be a valid number.",
        });
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    return { valid: true };
};

const validateEnseignant = (body) => {
    const errors = [];

    if (!body.nom || typeof body.nom !== "string") {
        errors.push({
            field: "nom",
            message: "Field 'nom' is required and must be a string.",
        });
    }

    if (!body.prenom || typeof body.prenom !== "string") {
        errors.push({
            field: "prenom",
            message: "Field 'prenom' is required and must be a string.",
        });
    }

    if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
        errors.push({
            field: "email",
            message:
                "Field 'email' is required and must be a valid email address.",
        });
    }

    if (!body.matiere || typeof body.matiere !== "string") {
        errors.push({
            field: "matiere",
            message: "Field 'matiere' is required and must be a string.",
        });
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    return { valid: true };
};

module.exports = {
    validateClasse,
    validateEtudiant,
    validateEnseignant,
};
