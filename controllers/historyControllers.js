// const { Op } = require("sequelize.Op");
const { Op } = require("sequelize");
const { History } = require("../models");

class historyControllers {

    static create(req, res) {

        let jadwal_id = req.body.jadwal_id === '' ? null : req.body.jadwal_id
        let kucing_id = req.body.kucing_id === '' ? null : req.body.kucing_id
        let owner_id = req.body.owner_id === '' ? null : req.body.owner_id
        let grooming_id = req.body.grooming_id === '' ? null : req.body.grooming_id
        let dokter_id = req.body.dokter_id === '' ? null : req.body.dokter_id
        let penitipan_id = req.body.penitipan_id === '' ? null : req.body.penitipan_id

        let input = {
            kucing_id: kucing_id,
            owner_id: owner_id,
            grooming_id: grooming_id,
            dokter_id: dokter_id,
            penitipan_id: penitipan_id,
            jadwal_id: jadwal_id,
            status : true,
        };

        History.create(input)
            .then((data) => {
                res.status(201).json({data});
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    static async index(req, res){
        History.findAll({
            attributes: {exclude:["createdAt","updatedAt"]}
        })
			.then((data) => {
				res.status(200).json({
					history_layanan: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

    static async history_kucing(req, res){
        History.findAll({
            where: {kucing_id: req.params.kucingId},
            attributes: {exclude:["createdAt","updatedAt"]}
        })
			.then((data) => {
				res.status(200).json({
					history_layanan: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

    static async history_grooming_kucing(req, res){
        History.findAll({
            where: {
                kucing_id: req.params.kucingId,
                grooming_id: {[Op.not]: null}
            },
            attributes: {exclude:["createdAt","updatedAt",
                                    "penitipan_id","dokter_id"]}
        })
			.then((data) => {
				res.status(200).json({
					history_grooming_kucing: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

    static async history_dokter_kucing(req, res){
        History.findAll({
            where: {
                kucing_id: req.params.kucingId,
                dokter_id: {[Op.not]: null}
            },
            attributes: {exclude:["createdAt","updatedAt",
                                    "penitipan_id","grooming_id"]}
        })
			.then((data) => {
				res.status(200).json({
					history_dokter_kucing: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

    static async history_penitipan_kucing(req, res){
        History.findAll({
            where: {
                kucing_id: req.params.kucingId,
                penitipan_id: {[Op.not]: null}
            },
            attributes: {exclude:["createdAt","updatedAt",
                                    "grooming_id","dokter_id"]}
        })
			.then((data) => {
				res.status(200).json({
					history_penitipan_kucing: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

}

module.exports = historyControllers;