const pool = require('../config/db');

const pedidoModel = {
    insertPedido: async (pIdCliente, pDataPedido, pTipoEntrega, pDistanciaPedido, pPesoCarga, pValorKmPedido, pValorKgPeso) => {

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const sqlPedido = `INSERT INTO pedidos (id_cliente_fk, data_pedido, tipo_entrega, distancia_pedido, peso_carga, valor_km_pedido, valor_kg_peso) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const valuesPedido = [pIdCliente, pDataPedido, pTipoEntrega, pDistanciaPedido, pPesoCarga, pValorKmPedido, pValorKgPeso];

            const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);

            await connection.commit();

            return rowsPedido;

        } catch (error) {
            await connection.rollback();
            throw error;
        }
    }
}

module.exports = { pedidoModel };
