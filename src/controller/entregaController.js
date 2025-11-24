const entregaModel = require('../model/entregaModel');

const entregaController = {

    calcularEntrega: async (req, res) => {
        try {

            const { id_pedido, distancia_km, peso_kg, tipo_entrega, valor_km, valor_kg } = req.body;

        
            if (!id_pedido || !distancia_km || !peso_kg || !tipo_entrega || !valor_km || !valor_kg) {
                return res.status(400).json({
                    message: "Verifique os dados enviados e tente novamente."
                })
            }

            
            const valorDistancia = distancia_km * valor_km
            const valorPeso = peso_kg * valor_kg

            let valorBase = valorDistancia + valorPeso

            let acrescimo = 0;
            if (tipo_entrega === "urgente") {
                acrescimo = valorBase * 0.20
            }

            let valorFinal = valorBase + acrescimo;

            let desconto = 0;
            if (valorFinal > 500) {
                desconto = valorFinal * 0.10;
                valorFinal -= desconto;
            }

            let taxaExtra = 0;
            if (peso_kg > 50) {
                taxaExtra = 15;
                valorFinal += taxaExtra;
            }

            

            return res.status(201).json({
                message: "Entrega calculada com sucesso!",
                dados: {valorBase, acrescimo,desconto,taxaExtra,valorFinal
                }
            })

        } catch (error) {
            console.error(error);return res.status(500).json({message: "Erro no servidor",error: error.message })
        }
    }

}

module.exports = {entregaController};