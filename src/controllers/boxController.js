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

module.exports = {
    listarCategorias,
    listarBoxes,
    criarBox,
};