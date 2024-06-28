'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
	  await Promise.all([
			// FK PEMILIK KUCING
			queryInterface.addColumn("Kucings", "owner_id", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addConstraint("Kucings", {
				fields: ["owner_id"],
				type: "foreign key",
				name: "pemilik_kucing",
				references: {
					table: "Owners",
					field: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			}),

			// FK JADWAL GROOMING
			queryInterface.addColumn("Jadwals", "grooming_id", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addConstraint("Jadwals", {
				fields: ["grooming_id"],
				type: "foreign key",
				name: "jadwal_grooming",
				references: {
					table: "Groomings",
					field: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			}),

			// FK JADWAL PENITIPAN
			queryInterface.addColumn("Jadwals", "penitipan_id", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addConstraint("Jadwals", {
				fields: ["penitipan_id"],
				type: "foreign key",
				name: "jadwal_penitipan",
				references: {
					table: "Penitipans",
					field: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			}),

			// FK JADWAL DOKTER
			queryInterface.addColumn("Jadwals", "dokter_id", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addConstraint("Jadwals", {
				fields: ["dokter_id"],
				type: "foreign key",
				name: "jadwal_dokter",
				references: {
					table: "Dokters",
					field: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			}),
			
      // FK HISTORY KUCING
      queryInterface.addColumn("Histories", "kucing_id", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addConstraint("Histories", {
        fields: ["kucing_id"],
        type: "foreign key",
        name: "history_kucing",
        references: {
          table: "Kucings",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
			
      // FK HISTORY OWNER
      queryInterface.addColumn("Histories", "owner_id", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addConstraint("Histories", {
        fields: ["owner_id"],
        type: "foreign key",
        name: "history_kucing_owner",
        references: {
          table: "Owners",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

			// FK HISTORY GROOMING
			queryInterface.addColumn("Histories", "grooming_id", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addConstraint("Histories", {
				fields: ["grooming_id"],
				type: "foreign key",
				name: "history_grooming",
				references: {
					table: "Groomings",
					field: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			}),

			// FK HISTORY DOKTER
			queryInterface.addColumn("Histories", "dokter_id", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addConstraint("Histories", {
				fields: ["dokter_id"],
				type: "foreign key",
				name: "history_dokter",
				references: {
					table: "Dokters",
					field: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			}),

			// FK HISTORY PENITIPAN
			queryInterface.addColumn("Histories", "penitipan_id", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addConstraint("Histories", {
				fields: ["penitipan_id"],
				type: "foreign key",
				name: "history_penitipan",
				references: {
					table: "Penitipans",
					field: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			}),

			// FK HISTORY JADWAL
			queryInterface.addColumn("Histories", "jadwal_id", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addConstraint("Histories", {
				fields: ["jadwal_id"],
				type: "foreign key",
				name: "history_jadwal",
				references: {
					table: "Jadwals",
					field: "id",
				},
				onDelete: "cascade",
				onUpdate: "cascade",
			}),



		]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
