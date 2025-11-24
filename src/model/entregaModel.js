const pool = require('../config/db');

const entregaModel = {
    criarEntrega: async (id_pedido, acrescimo_entrega, taxa_desconto, taxa_extra, valor_final) => {


        const sql = `INSERT INTO entrega (id_pedido, acrescimo_entrega, taxa_desconto, taxa_extra, valor_final) VALUES (?, ?, ?, ?, ?)`;

        const values = [ id_pedido, acrescimo_entrega, taxa_desconto, taxa_extra, valor_final ];

        try {
            const [result] = await pool.query(sql, values);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = { entregaModel };
