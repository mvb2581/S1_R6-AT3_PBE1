const pool = require('../config/db');

const entregaModel = {
    criarEntrega: async (dados) => {
        const { id_pedido, valor_base, acrescimo_entrega, taxa_desconto, taxa_extra, valor_final } = dados;

        const sql = "INSERT INTO entrega (id_pedido,taxa_extra, taxa_desconto,acrescimo_entrega,valor_final) VALUES (?, ?, ?, ?, ?)";
        const values = [id_pedido, valor_base, acrescimo_entrega, taxa_desconto, taxa_extra, valor_final]

        try {
            const [result] = await pool.query(sql, values)
            return result.insertId
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {entregaModel}