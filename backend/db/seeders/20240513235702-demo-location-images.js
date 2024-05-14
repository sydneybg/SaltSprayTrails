'use strict';

const { LocationImage } = require('../models');

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

// Location Images
const demoLocationImages = [
  {
    locationId: 1,
    imageUrl: 'http://example.com/image1.jpg',
  },
  {
    locationId: 1,
    imageUrl: 'http://example.com/image2.jpg',
  },
  {
    locationId: 2,
    imageUrl: 'http://example.com/image3.jpg',
  },
  {
    locationId: 3,
    imageUrl: 'http://example.com/image4.jpg',
  }
];

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'LocationImages';
    await LocationImage.bulkCreate(demoLocationImages, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'LocationImages';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {}, {});
  }
};
