const { Grooming } = require("../models");
const RPGen = require("../libs/balanceLibs");

class groomingControllers {

    static create(req, res) {

        let input = {
            type: req.body.type,
            harga: req.body.harga,
        };

        let harga = RPGen.rupiahGenerator(req.body.harga);

        Grooming.create(input)
            .then((data) => {
                let show_data = {
                    id: data.id,
                    type: data.type,
                    harga: harga
                }
                res.status(201).json({grooming:show_data});
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    static async index(req, res){
        let grooming_all = await Grooming.findAll({
            attributes: {exclude:["createdAt","updatedAt"]}
        })
        
        let show_data = [];

        grooming_all.forEach((data) =>{
            let harga = RPGen.rupiahGenerator(data.harga)
            let final = {
                id: data.id,
                type: data.type,
                harga: harga
            }
            show_data.push(final)
        })

        res.status(200).json({
            grooming: show_data,
        });
    }
}

module.exports = groomingControllers;