const {pedidoModel} = require('../model/pedidoModel');
const pedidoController = {

    criarPedido: async (req, res) => {
    try {
        const {id_cliente,  data_pedido,  tipo_entrega,  distancia_pedido,  peso_carga,  valor_km_pedido,  valor_kg_peso} = req.body
        if (
            !id_cliente ||!data_pedido ||!tipo_entrega ||tipo_entrega.length > 9 ||!distancia_pedido ||isNaN(distancia_pedido) || !peso_carga || isNaN(peso_carga) || !valor_km_pedido || isNaN(valor_km_pedido) || !valor_kg_peso || isNaN(valor_kg_peso)
        ) {
            return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente.' })
        }
        const resultado = await pedidoModel.insertPedido(id_cliente,data_pedido,tipo_entrega,distancia_pedido,peso_carga,valor_km_pedido,valor_kg_peso)
        
        return res.status(200).json({ 
            message: 'Registro incluído com sucesso!', 
            data: resultado 
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Ocorreu um erro no servidor', 
            errorMessage: error.message 
        });
    }
  }
}
    module.exports = { pedidoController }