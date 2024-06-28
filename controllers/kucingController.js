const { raw } = require("express");
const { Owner } = require("../models");
const { Kucing } = require("../models");

class kucingController {
    static create(req,res) {
        let input = {
            nama: req.body.nama,
            ras : req.body.ras,
            warna : req.body.warna,
            umur : req.body.umur,
            owner_id : req.body.owner_id,
        };

        Kucing.create(input)
            .then((data) => {
                res.status(201).json({data});
            })
            .catch((err) => {
                // res.status(500).json(err.errors[0].message);
                res.status(500).json(err);
            });
    }

    static index(req,res) {
        Kucing.findAll({
            attributes: {exclude:["createdAt","updatedAt"]}
        })
			.then((data) => {
				res.status(200).json({
					kucing: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

    static async getOneKucing(req,res) {
        let kucing_instance = await Kucing.findOne({
            where: {id: req.params.kucingId},
            attributes: {exclude:["createdAt","updatedAt"]},
            include: [{
                model: Owner,
                attributes: {exclude:["createdAt","updatedAt"]} 
              }],
        })

        if (kucing_instance === null) {
			res.status(404).json({ msg: "Kucing does not exists" });
		}else{
            res.status(200).json({
                kucing: kucing_instance,
            });
        }
    }

    static async update(req,res) {
        let nama, ras, warna, umur, owner_id
        
        let kucing_instance = await Kucing.findOne({
            where:{id: req.params.kucingId},
            attributes: {exclude:["createdAt","updatedAt"]},
        });

        if (kucing_instance === null) {
            return res.status(404).json({ msg: "Kucing does not exists" });
        }

        let kucing_instance_attribute = await Kucing.findOne({
            where:{id: req.params.kucingId},
            attributes: {exclude:["createdAt","updatedAt"]},
            raw: true
        });

        nama = req.body.nama === '' ? kucing_instance_attribute.nama : req.body.nama 
        ras = req.body.ras === '' ? kucing_instance_attribute.ras : req.body.ras 
        warna = req.body.warna === '' ? kucing_instance_attribute.warna : req.body.warna 
        umur = req.body.umur === '' ? kucing_instance_attribute.umur : req.body.umur 
        owner_id = req.body.owner_id === '' ? kucing_instance_attribute.owner_id : req.body.owner_id 
        
        let owner_instance = await Owner.findOne({where: {id: owner_id}})

        let t = typeof(owner_instance)
        if (owner_instance === null){
            return res.status(404).json({ msg: "Owner does not exists" });
        }  

        kucing_instance
            .update({
                nama: nama,
                ras: ras,
                warna: warna,
                umur: umur,
                owner_id: owner_id
            })
            .then((data) => {
                res.status(200).json({
                    id: data.dataValues.id,
                    nama: data.dataValues.nama,
                    ras: data.dataValues.ras,
                    warna: data.dataValues.warna,
                    umur: data.dataValues.umur,
                    owner_id: data.dataValues.owner_id
                });
            })
            .catch((err) => {
                res.status(500).json({ msg: err });
            });
    }
    
}

module.exports = kucingController;