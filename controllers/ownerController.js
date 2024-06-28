const { Owner } = require("../models");

class ownerControllers {
    static create(req,res) {
        let input = {
            nama: req.body.nama,
            alamat : req.body.alamat,
            telepon : req.body.telepon,
        };

        Owner.create(input)
            .then((data) => {
                res.status(201).json({data});
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
    static index(req,res) {
        Owner.findAll({
            attributes: {exclude:["createdAt","updatedAt"]}
        })
			.then((data) => {
				res.status(200).json({
					'pemilik kucing': data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }
    static getOneOwner(req,res) {
        Owner.findOne({
            where: {id: req.params.ownerId},
            attributes: {exclude:["createdAt","updatedAt"]}
        })
			.then((data) => {
				res.status(200).json({
					'pemilik kucing': data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

    static async update(req,res) {
        let nama, alamat, telepon

        let owner_instance = await Owner.findOne({
            where:{id: req.params.ownerId},
            attributes: {exclude:["createdAt","updatedAt"]}
        });

        if (owner_instance === null) {
			res.status(404).json({ msg: "'Pemilik Kucing' does not exists" });
		}

        if (req.body.nama == undefined || req.body.nama == ""){
            nama = owner_instance.nama
        } else {
            nama = req.body.nama
        }
        
        if (req.body.alamat == undefined || req.body.alamat == ""){
            alamat = owner_instance.alamat
        } else {
            alamat = req.body.alamat
        }

        if (req.body.telepon == undefined || req.body.telepon == ""){
            telepon = owner_instance.telepon
        } else {
            telepon = req.body.telepon
        }

        owner_instance
			.update({
				nama: nama,
                alamat: alamat,
                telepon: telepon
			})
			.then((data) => {
				res.status(200).json({
					id: data.dataValues.id,
					nama: data.dataValues.nama,
					alamat: data.dataValues.alamat,
                    telepon: data.dataValues.telepon
				});
			})
			.catch((err) => {
				res.status(500).json({ msg: err });
			});

    }
    

    static async delete(req,res) {
        let owner_instance = await Owner.findOne({
            where:{id: req.params.ownerId},
            attributes: {exclude:["createdAt","updatedAt"]}
        });

        if (owner_instance === null) {
			res.status(404).json({ msg: "'Pemilik Kucing' does not exists" });
		}else{
            await owner_instance.destroy()
            res.status(200).json({
                message: "'Pemilik Kucing' data has been successfully deleted"});
        }
    }
}

module.exports = ownerControllers;