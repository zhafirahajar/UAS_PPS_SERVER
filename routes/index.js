const route = require("express").Router();

const dokterControllers = require("../controllers/dokterController")
const ownerControllers = require("../controllers/ownerController")
const kucingControllers = require("../controllers/kucingController")
const groomingControllers = require("../controllers/groomingController")
const jadwalControllers = require("../controllers/jadwalControllers")
const historyControllers = require("../controllers/historyControllers");
const penitipanControllers = require("../controllers/penitipanControllers");

// CRUD DOKTER
route.post("/dokter", dokterControllers.create);
route.get("/dokter", dokterControllers.index);
route.get("/dokter/:dokterId", dokterControllers.getOneDokter);
route.put("/dokter/:dokterId", dokterControllers.update);
route.delete("/dokter/:dokterId", dokterControllers.delete);

// CRUD PEMILIK
route.post("/owner", ownerControllers.create);
route.get("/owner", ownerControllers.index);
route.get("/owner/:ownerId", ownerControllers.getOneOwner);
route.put("/owner/:ownerId", ownerControllers.update);
route.delete("/owner/:ownerId", ownerControllers.delete);

// CRUD KUCING
route.post("/kucing", kucingControllers.create);
route.get("/kucing", kucingControllers.index);
route.get("/kucing/:kucingId", kucingControllers.getOneKucing);
route.put("/kucing/:kucingId", kucingControllers.update);

// CRUD GROOMING
route.post("/grooming", groomingControllers.create);
route.get("/grooming", groomingControllers.index);

// CRUD PENITIPAN
route.post("/penitipan", penitipanControllers.create);
route.get("/penitipan", penitipanControllers.index);

// CRUD JADWAL
route.post("/jadwal", jadwalControllers.create);
route.get("/jadwal", jadwalControllers.index);
route.get("/jadwal_grooming", jadwalControllers.getJadwalGrooming);
route.get("/jadwal_dokter", jadwalControllers.getJadwalDokter);
route.get("/jadwal_penitipan", jadwalControllers.getJadwalPenitipan);

// CRUD HISTORY LAYANAN
route.post("/history_layanan", historyControllers.create);
route.get("/history_layanan", historyControllers.index);
route.get("/history_kucing/:kucingId", historyControllers.history_kucing);
route.get("/history_grooming_kucing/:kucingId", historyControllers.history_grooming_kucing);
route.get("/history_dokter_kucing/:kucingId", historyControllers.history_dokter_kucing);
route.get("/history_penitipan_kucing/:kucingId", historyControllers.history_penitipan_kucing);


module.exports = route;