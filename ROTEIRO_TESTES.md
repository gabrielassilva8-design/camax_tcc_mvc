# Roteiro de Testes - API Centro-Camax

## 1. Testes Manuais de API (Thunder Client)
**Base URL Local:** `http://localhost:3000`

| ID | Caso de Teste | Método / Rota | Entrada Esperada (Body/Params) | Ação | Resultado Esperado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC01 | Listar categorias existentes | `GET /api/categorias` | Nenhuma | Enviar requisição GET | Status `200 OK` + lista de categorias com UUID |
| TC02 | Cadastro de Box com sucesso | `POST /api/boxes` | `{"nome": "Barraca do João", "numeroBox": "Box 15", "categoriaId": "a0eebc99-9c0b-4ef8-bb6d-6bb0bd380a11"}` | Enviar requisição POST | Status `201 Created` + objeto criado com `id: "box-1"` |
| TC03 | Listagem geral de Boxes | `GET /api/boxes` | Nenhuma | Enviar requisição GET | Status `200 OK` + array contendo os boxes cadastrados |
| TC04 | Busca por ID com relacionamento | `GET /api/boxes/box-1` | Parâmetro `id = box-1` | Enviar requisição GET | Status `200 OK` + dados do box e objeto `categoria` vinculado |
| TC05 | Atualização de Box | `PUT /api/boxes/box-1` | `{"nome": "Barraca do João Atualizada", "numeroBox": "Box 16"}` | Enviar requisição PUT | Status `200 OK` + objeto atualizado |
| TC06 | Exclusão de Box | `DELETE /api/boxes/box-1` | Parâmetro `id = box-1` | Enviar requisição DELETE | Status `200 OK` + mensagem de remoção |
| TC07 | Erro: Dados imcompletos ou inválidos | `POST /api/boxes` | `{"nome": "Ab", "numeroBox": "", "categoriaId": "id-invalido"}` | Enviar requisição POST | Status `400 Bad Request` bloqueado pela validação Zod |
| TC08 | Erro: ID inexistente | `GET /api/boxes/box-999` | Parâmetro `id = box-999` | Enviar requisição GET | Status `404 Not Found` + `{"erro": "Box não encontrado"}` |

---

## 2. Testes Unitários (Jest)

| ID | Cenário | Entrada | Ação | Resultado Esperado |
| :--- | :--- | :--- | :--- | :--- |
| JU01 | Cadastro válido no controller | `req.body` com `nome`, `numeroBox` e `categoriaId` UUID válido | Chamar `boxController.criarBox` | Retorna status `201` e objeto com `id` gerado |
| JU02 | Filtro de listagem por busca e categoria | `req.query` com `busca: "João"` e `categoriaId` válido | Chammar `boxController.listarBoxes` | Retorna status `200` apenas com os boxes  correspondentes |
| JU03 | Erro ao buscar box inexistente | `req.params` com `id: "box-inexistente"` | Chamar `boxController.buscarBoxPorId` | Retorna status `404` com mensagem de erro controlada |

---

## 3. Teste End-to-End / E2E (Cypress)

| ID | Fluxo Crítico | Passos Executados | Resultado |
| :--- | :--- | :--- | :--- |
| E2E01 | Fluxo completo de criação, vínculo e consulta | 1. Consulta `GET /api/categorias` e obtém UUID<br>2. Cria box via `POST api/boxes` vinculado ao UUID<br>3. Consulta `GET /api/boxes/:id` | Retorna `200 OK` com o box e os dados da categoria vinculada |
| E2E02 | Fluxo de atualização, exclusão e validação 404 | 1. Atualiza o box criado via `PUT /api/boxes/:id`<br>2. Exclui via `DELETE /api/boxes/:id`<br>3. Tenta consultar novamente via `GET /api/boxes/:id` | Retorna `404 Not Found` após a exclusão |



