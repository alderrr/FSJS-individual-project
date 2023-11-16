"use strict";

const data = require("../data/users.json");
const { hashPassword } = require("../helpers/bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data.forEach((user) => {
      delete user.id;
      user.password = hashPassword(user.password);
      user.createdAt = user.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
