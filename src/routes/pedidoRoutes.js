const express = require('express');
const pedidoRoutes = express.Router();
const {pedidoController} = require('../controller/pedidoController');

pedidoRoutes.post('/pedido', pedidoController.criarPedido);

module.exports = {pedidoRoutes}