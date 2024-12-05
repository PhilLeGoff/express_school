function validateIdParam(req, res, next) {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res
            .status(400)
            .json({ error: "Invalid or missing 'id' parameter." });
    }
    next();
}

module.exports = validateIdParam;
