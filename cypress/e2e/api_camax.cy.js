describe('Testes E2E - API Centro-Camax', () => {
    const baseUrl = 'http://localhost:3000/api';
    let boxCriadoId;
    let categoriaIdValida;

    it('E2E01: Deve consultar categorias, criar um box vinculado e buscar por ID com relacionamento', () => {
       // 1. Obtém uma categoria válida (registro pai)
       cy.request('GET', `${baseUrl}/categorias`).then((resCat) => {
        expect(resCat.status).to.eq(200);
        expect(resCat.body.length).to.be.greaterThan(0);
        categoriaIdValida = resCat.body[0].id;

        // 2. Cria um novo box vinculado à categoria (resgistro filho)
        cy.request({
            method: 'POST',
            url: `${baseUrl}/boxes`,
            body: {
                nome: 'Barraca Festas e Cia',
                numeroBox: 'Box 77',
                categoriaId: categoriaIdValida
            }
        }).then((resPost) => {
            expect(resPost.status).to.eq(201);
            expect(resPost.body).to.have.property('id');
            boxCriadoId = resPost.body.id;

            // 3. Busca o box por ID e valida o vínculo com a categoria
            cy.request('GET', `${baseUrl}/boxes/${boxCriadoId}`).then((resGet) => {
                expect(resGet.status).to.eq(200);
                expect(resGet.body.nome).to.eq('Barraca Festas e Cia');
                expect(resGet.body.categoria).to.have.property('id', categoriaIdValida);
            });
        });
    });
});

it('E2E02: Deve atualizar o box, excluir e confirmar erro 404 na consulta seguinte', () => {
   // 1. Atualiza o box
   cy.request({
    method: 'PUT',
    url: `${baseUrl}/boxes/${boxCriadoId}`,
    body: {
        nome: 'Barraca Acessórios Atualizada',
        numeroBox: 'Box 88'
    }
   }).then((resPut) => {
    expect(resPut.status).to.eq(200);
    expect(resPut.body.nome).to.eq('Barraca Acessórios Atualizada');

    // 2. Excluir o box
    cy.request('DELETE', `${baseUrl}/boxes/${boxCriadoId}`).then((resDel) => {
        expect(resDel.status).to.eq(200);

        // 3. Valida retorno 404 após exclusão
        cy.request({
            method: 'GET',
            url: `${baseUrl}/boxes/${boxCriadoId}`,
            failOnStatusCode: false
        }).then((resNotFound) => {
            expect(resNotFound.status).to.eq(404);
        });
      });
    });
  });
});