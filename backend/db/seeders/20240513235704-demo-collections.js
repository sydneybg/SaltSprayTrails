'use strict';

const { Collection } = require("../models");


let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Collections';

    await Collection.bulkCreate([
      {
        userId: 1,
        name: 'Mountain Adventures',
        imageUrl: 'https://www.travelandleisure.com/thmb/GmekR2hjot6B2mWovmI4J192nSk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-grand-teton-USMNTNSIPOG0823-2538d183b9094e3fb59dd5e54bbe791c.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        name: 'Beach Holidays',
        imageUrl: 'https://cdn.coastalscience.noaa.gov/csmedia/2022/02/View-of-St.-Croix-Island-looking-north-768x576.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        name: 'Historic Sites',
        imageUrl: 'https://wisconsinexaminer.com/wp-content/uploads/2021/09/NHAL-Logging-061-1536x1024.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        name: 'Nature Walks',
        imageUrl: 'https://dlnr.hawaii.gov/wp-content/uploads/2021/10/2GWLuWT4-1024x683.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        name: 'City Breaks',
        imageUrl: 'https://www.fisheries.noaa.gov/s3/styles/media_750_x500/s3/2022-02/750x500-elwha-river-credit-john-mcmillan.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Collections';

    await queryInterface.bulkDelete({}, null, options);
  }
};
