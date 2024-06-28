const { Penitipan } = require("../models");
const RPGen = require("../libs/balanceLibs");

class penitipanControllers {

    static create(req, res) {

        let input = {
            type: req.body.type,
            harga: req.body.harga,
            durasi: req.body.durasi,
        };

        let harga = RPGen.rupiahGenerator(req.body.harga);

        Penitipan.create(input)
            .then((data) => {
                let show_data = {
                    id: data.id,
                    type: data.type,
                    durasi: `${data.durasi} hari`,
                    harga: harga
                }
                res.status(201).json({penitipan:show_data});
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    static async index(req, res){
        let penitipan_all = await Penitipan.findAll({
            attributes: {exclude:["createdAt","updatedAt"]}
        })
        
        let show_data = [];

        penitipan_all.forEach((data) =>{
            let harga = RPGen.rupiahGenerator(data.harga)
            let final = {
                id: data.id,
                type: data.type,
                durasi: `${data.durasi} hari`,
                harga: harga
            }
            show_data.push(final)
        })

        res.status(200).json({
            penitipan: show_data,
        });
    }
}

module.exports = penitipanControllers;