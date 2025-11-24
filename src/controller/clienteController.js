const { clienteModel } = require('../model/clienteModel.js');
const clienteController = {

    criarCliente: async (req, res) => {
        try {
            const { nome, cpf, telefone, email, endereco } = req.body;

            if (!nome || nome.length > 50 || !cpf || String(cpf).length !== 11 || !telefone || telefone.length > 13 || !email || !email.includes("@gmail.com") || !endereco || endereco.length > 100) {
                return res.status(400).json({ message: 'Dados inválidos. Verifique os dados enviados.' });
            }

            const resultado = await clienteModel.criarCliente(nome, cpf,telefone, email, endereco);


            if (resultado.affectedRows === 1 && resultado.insertId != 0) {
                return res.status(201).json({
                    message: 'Registro incluído com sucesso.', result: resultado
                });

            } else {

                return res.status(400).json({ message: 'Falha ao incluir o registro.' });
            }

        } catch (error) {
            console.error('Erro ao incluir cliente:', error);
            return res.status(409).json({
                message: 'Voce está tentando inserir um cpf que já está na tabela.',
                errorMessage: error.message
            });
        }
    }
}

module.exports = { clienteController }
