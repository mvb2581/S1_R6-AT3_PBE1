const { entregaModel } = require('../model/entregaModel');

const entregaController = {

    calcularEntrega: async (req, res) => {
        try {

            const { id_pedido, distancia_km, peso_kg, tipo_entrega, valor_km, valor_kg } = req.body;

           
            if (!id_pedido || !distancia_km || !peso_kg || !tipo_entrega || !valor_km || !valor_kg) {
                return res.status(400).json({
                    message: "Verifique os dados enviados e tente novamente."
                });
            }

            
            const valor_distancia = distancia_km * valor_km;
            const valor_peso = peso_kg * valor_kg;

            const valor_base = valor_distancia + valor_peso;

            const acrescimo_entrega = tipo_entrega === "urgente" ? valor_base * 0.20 : 0;

            let valor_final = valor_base + acrescimo_entrega;

            let taxa_desconto = 0;
            if (valor_final > 500) {
                taxa_desconto = valor_final * 0.10;
                valor_final -= taxa_desconto;
            }

            let taxa_extra = 0;
            if (peso_kg > 50) {
                taxa_extra = 15;
                valor_final += taxa_extra;
            }

            const resultado = await entregaModel.criarEntrega( id_pedido, acrescimo_entrega, taxa_desconto, taxa_extra, valor_final
            );
            return res.status(201).json({
                message: "Entrega calculada com sucesso.",
                dados: {valor_base,acrescimo_entrega,taxa_desconto,taxa_extra,valor_final},
                id_entrega: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor",
                error: error.message
            });
        }
    }
};

module.exports = { entregaController };
