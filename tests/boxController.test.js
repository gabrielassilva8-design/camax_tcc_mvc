const boxController = require('../src/controllers/boxController');

// Helper para simular req e res do Express
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Testes Unitários - boxController (Centro-Camax)', () => {

    test('JU01: Deve criar um box com sucesso e retornar status 201', () => {
        const req = {
            body: {
                nome: 'Pastelaria Camaçari',
                numeroBox: 'Box 04',
                categoriaId: 'a0eebc99-9c0b-4ef8-bb6d-6bb0bd380a11'
            }
        };
        const res = mockResponse();

        boxController.criarBox(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'box-1',
                nome: 'Pastelaria Camaçari',
                numeroBox: 'Box 04',
                categoriaId: 'a0eebc99-9c0b-4ef8-bb6d-6bb0bd380a11' 
            })
        );
    });

    test('JU02: Deve filtrar boxes corretamente pelo parâmetro busca e categoriaId', () => {
        const req = {
            query: {
                busca: 'Pastelaria',
                categoriaId: 'a0eebc99-9c0b-4ef8-bb6d-6bb0bd380a11'
            }
        };
        const res = mockResponse();

        boxController.listarBoxes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        const resultado = res.json.mock.calls[0][0];
        expect(resultado.length).toBe(1);
        expect(resultado[0].nome).toBe('Pastelaria Camaçari'); 
    });

    test('JU03: Deve retornar status 404 ao buscar um ID inexistente', () => {
        const req = {
            params: { id: 'box-999' }
        };
        const res = mockResponse();

        boxController.buscarBoxPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ erro: 'Box não encontrado'});
    });

});