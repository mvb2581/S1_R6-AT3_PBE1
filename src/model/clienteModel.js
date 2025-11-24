const pool = require('../config/db');

const clienteModel = {
    criarCliente: async (pID, pNome, pCpf,pTelefone,pEmail,pEndereco) => {
        const sql = 'INSERT INTO cliente (nome_cliente,cpf_cliente,telefone_cliente,email_cliente,endereco_cliente) VALUES (?,?,?,?,?)';
        const values = [pID,pNome,pCpf,pTelefone,pEmail,pEndereco];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
        }
    }

module.exports = { clienteModel };