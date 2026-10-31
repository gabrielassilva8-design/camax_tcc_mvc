const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: "Dados inválidos.",
            erros: error.errors ? error.errors.map((e) => e.message) : error.message,
        });
    }
};

module.exports = validate;