const express = require('express');
const clienteRoutes=express.Router();

const {clienteController} = require('../controller/clienteController');

clienteRoutes.post('/cliente', clienteController.criarCliente);

module.exports = {clienteRoutes};