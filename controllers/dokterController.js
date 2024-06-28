const { Dokter } = require("../models");
const RPGen = require("../libs/balanceLibs");

class dokterControllers {

    static create(req, res) {

        let input = {
            nama: req.body.nama,
            lulusan: req.body.lulusan,
            harga_layanan: req.body.harga,
        };

        let harga_layanan = RPGen.rupiahGenerator(req.body.harga);

        Dokter.create(input)
            .then((data) => {
                let show_data = {
                    id: data.id,
                    nama: data.nama,
                    lulusan: data.lulusan,
                    harga: harga_layanan
                }
                res.status(201).json({dokter:show_data});
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    static async index(req, res){
        let dokter_all = await Dokter.findAll({
            attributes: {exclude:["createdAt","updatedAt"]},
            order: [
                ['id', 'ASC'],
            ],
        })
		
        let show_data = [];

        dokter_all.forEach((data) =>{
            let harga = RPGen.rupiahGenerator(data.harga_layanan)
            let final = {
                id: data.id,
                nama: data.nama,
                lulusan: data.lulusan,
                harga: harga
            }
            show_data.push(final)
        })
        
        res.status(200).json({
            dokter: show_data,
        });
    }

    static async getOneDokter(req, res){
        let dokter_instance = await Dokter.findOne({
            where: {id: req.params.dokterId},
            attributes: {exclude:["createdAt","updatedAt"]}
        })
        
        if (dokter_instance === null) {
            return res.status(404).json({ msg: "Dokter does not exists" });
        }

        res.status(200).json({
            id: dokter_instance.id,
            nama: dokter_instance.nama,
            lulusan: dokter_instance.lulusan,
            harga_layanan: dokter_instance.harga_layanan,
        });
    }
    
    static async update(req, res){
        let nama, lulusan, harga;
        let dokter_instance = await Dokter.findOne({
            where:{id: req.params.dokterId},
            attributes: {exclude:["createdAt","updatedAt"]}
        });

        if (dokter_instance === null) {
			res.status(404).json({ msg: "Dokter does not exists" });
		}

        if (req.body.nama == undefined || req.body.nama == ""){
            nama = dokter_instance.nama
        } else {
            nama = req.body.nama
        }
        
        if (req.body.lulusan == undefined || req.body.lulusan == ""){
            lulusan = dokter_instance.lulusan
        } else {
            lulusan = req.body.lulusan
        }

        if (req.body.harga == undefined || req.body.harga == ""){
            harga = dokter_instance.harga
        } else {
            harga = req.body.harga
        }

        dokter_instance
			.update({
				nama: nama,
                lulusan: lulusan,
                harga_layanan: harga,
			})
			.then((data) => {
				res.status(200).json({
					id: data.dataValues.id,
					nama: data.dataValues.nama,
					lulusan: data.dataValues.lulusan,
				});
			})
			.catch((err) => {
				res.status(500).json({ msg: err });
			});

    }

    static async delete(req, res) {

        let dokter_instance = await Dokter.findOne({
            where:{id: req.params.dokterId},
            attributes: {exclude:["createdAt","updatedAt"]}
        });

        if (dokter_instance === null) {
			res.status(404).json({ msg: "Dokter does not exists" });
		}

        await dokter_instance.destroy()
        
        res.status(200).json({
            message: "Dokter data has been successfully deleted"});
        
	}
}

module.exports = dokterControllers;
