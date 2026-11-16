// Arrays de memória para simular as tabelas do banco de dados
const categoriasMock = [
    { id: "a0eebc99-9c0b-4ef8-bb6d-6bb0bd380a11", nome: "Festa" },
    { id: "b1febc99-9c0b-4ef8-bb6d-6bb9bd380a22", nome: "Roupas" }
];

const boxesMock = [];

// GET /api/categorias
const listarCategorias = (req, res) => {
    return res.status(200).json(categoriasMock);
};

// GET /api/boxes
const listarBoxes = (req, res) => {
    const { busca, categoriaId } = req.query;
    let resultado = [...boxesMock];

    if (categoriaId) {
        resultado = resultado.filter((box) => box.categoriaId === categoriaId);
    }

    if (busca) {
        resultado = resultado.filter((box) => box.nome.toLowerCase().includes(busca.toLowerCase()));
    }

    return res.status(200).json(resultado);
};

// GET /api/boxes/:id (Busca por ID com relacionamento da categoria)
const buscarBoxPorId = (req, res) => {
    const { id } = req.params;
    const box = boxesMock.find((b) => b.id === id)

    if (!box) {
        return res.status(404).json({erro: "Box não encontrado"});
    }

    const categoria = categoriasMock.find((c) => c.id === box.categoriaId) || null;
    return res.status(200).json({...box, categoria });
};

// POST /api/boxes
const criarBox = (req, res) => {
    const { nome, numeroBox, categoriaId } = req.body;

    const novoBox = {
        id: `box-${boxesMock.length + 1}`,
        nome,
        numeroBox,
        categoriaId,
        dataCriacao: new Date()
    };

    boxesMock.push(novoBox);

    return res.status(201).json(novoBox);
};

// PUT /api/boxes/:id
const atualizarBox = (req, res) => {
    const { id } = req.params;
    const index = boxesMock.findIndex((b) => b.id === id);

    if (index === -1) {
        return res.status(404).json({erro: "Box não encontrado"});
    }

    const { nome, numeroBox, categoriaId } = req.body;
    boxesMock[index] = {
        ...boxesMock[index],
        nome: nome ?? boxesMock[index].nome,
        numeroBox: numeroBox ?? boxesMock[index].numeroBox,
        categoriaId: categoriaId ?? boxesMock[index].categoriaId,
    };

    return res.status(200).json(boxesMock[index]);
};

// DELETE /api/boxes/:id
const deletarBox = (req, res) => {
    const { id } = req.params;
    const index = boxesMock.findIndex((b) => b.id === id);

    if (index === -1) {
        return res.status(404).json({erro: "Box não encontrado"});
    }

    boxesMock.splice(index, 1);
    return res.status(200).json({mensagem: "Box removido com sucesso"});
}

module.exports = {
    listarCategorias,
    listarBoxes,
    criarBox,
    atualizarBox,
    deletarBox,
};
