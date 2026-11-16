const { Router } = require('express');
const { z } = require('zod');
const validate = require('../middlewares/validate');
const boxController = require('../controllers/boxController');

const router = Router();

// --- GET /api/categorias ---
router.get('/categorias', boxController.listarCategorias);

// --- GET /api/boxes ---
const listarBoxesSchema = z.object({
    query: z.object({
        busca: z.string().optional(),
        categoriaId: z.string().uuid("Categoria ID inválido").optional()
    })
});

router.get('/boxes', validate(listarBoxesSchema), boxController.listarBoxes);

// --- GET /api/boxes/:id ---
router.get('/boxes/:id', boxController.buscarBoxPorId);

// --- POST /api/boxes ---
const criarBoxSchema = z.object({
    body: z.object({
        nome: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
        numeroBox: z.string().min(1, "Número do box é obrigatório"),
        categoriaId: z.string().uuid("categoria inválida")
    })
});

router.post('/boxes', validate(criarBoxSchema), boxController.criarBox);

// --- PUT /api/boxes/:id ---
const atualizarBoxSchema = z.object({
    body: z.object({
        nome: z.string().min(3, "Nome deve ter ao menos 3 caracteres").optional(),
        numeroBox: z.string().min(1, "Número do box é obrigatório").optional(),
        categoriaId: z.string().uuid("categoria inválida").optional()
    })
});

router.put('/boxes/:id', validate(atualizarBoxSchema), boxController.atualizarBox);

// --- DELETE /api/boxes/:id ---
router.delete('/boxes/:id', boxController.deletarBox)

module.exports = router;
