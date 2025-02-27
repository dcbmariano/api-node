const express = require('express');
const router = express.Router();

let produtos = [
    { id: 1, nome: "Lápis", preco: 1.00 },
    { id: 2, nome: "Caneta", preco: 2.00 },
    { id: 3, nome: "Caderno", preco: 5.50 }
];

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna a lista de produtos
 *     description: Obtém todos os produtos disponíveis no sistema.
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
 */
router.get('/', (req, res) => {
    res.json(produtos);
});

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', (req, res) => {
    const produto = produtos.find(p => p.id == req.params.id);
    if (!produto) return res.status(404).send('Produto não encontrado.');
    res.json(produto);
});

/**
 * @swagger
 * /produtos/adicionar:
 *   post:
 *     summary: Adiciona um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post('/adicionar', (req, res) => {
    const novo_produto = {
        id: produtos.length + 1,
        nome: req.body.nome,
        preco: req.body.preco
    };
    produtos.push(novo_produto);
    res.status(201).json(novo_produto);
});

/**
 * @swagger
 * /produtos/editar/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.put('/editar/:id', (req, res) => {
    const produto = produtos.find(p => p.id == req.params.id);
    if (!produto) return res.status(404).send('Produto não encontrado.');

    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    res.json(produto);
});

/**
 * @swagger
 * /produtos/apagar/{id}:
 *   delete:
 *     summary: Remove um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/apagar/:id', (req, res) => {
    const index = produtos.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).send('Produto não encontrado.');

    produtos.splice(index, 1);
    res.send('Produto removido.');
});

module.exports = router;
