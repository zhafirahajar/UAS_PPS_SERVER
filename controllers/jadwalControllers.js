const { Op } = require("sequelize");
const { Jadwal, Grooming } = require("../models");

class jadwalControllers {

    static create(req, res) {

        let grooming_id = req.body.grooming_id === null ? null : req.body.grooming_id
        let dokter_id = req.body.dokter_id === null ? null : req.body.dokter_id
        let penitipan_id = req.body.penitipan_id === null ? null : req.body.penitipan_id

        let input = {
            grooming_id: grooming_id,
            dokter_id: dokter_id,
            penitipan_id: penitipan_id,
            tanggal: req.body.tanggal,
            jam : req.body.jam,
            status : req.body.status,
        };

        Jadwal.create(input)
            .then((data) => {
                res.status(201).json({data});
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    static async index(req, res){
        Jadwal.findAll({
            attributes: {exclude:["createdAt","updatedAt"]}
        })
			.then((data) => {
				res.status(200).json({
					jadwal: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

    static async getJadwalGrooming(req, res){
        Jadwal.findAll({
            where: {grooming_id: {[Op.not]: null}},
            attributes: {exclude:["createdAt","updatedAt",
                                    "dokter_id","penitipan_id"]}
        })
			.then((data) => {
				res.status(200).json({
					Jadwal_grooming: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

    static async getJadwalDokter(req, res){
        Jadwal.findAll({
            where: {dokter_id: {[Op.not]: null}},
            attributes: {exclude:["createdAt","updatedAt",
                                    "grooming_id","penitipan_id"]}
        })
			.then((data) => {
				res.status(200).json({
					Jadwal_dokter: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }

    static async getJadwalPenitipan(req, res){
        Jadwal.findAll({
            where: {penitipan_id: {[Op.not]: null}},
            attributes: {exclude:["createdAt","updatedAt",
                                    "dokter_id","penitipan_id"]}
        })
			.then((data) => {
				res.status(200).json({
					Jadwal_penitipan: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
    }
}

module.exports = jadwalControllers;