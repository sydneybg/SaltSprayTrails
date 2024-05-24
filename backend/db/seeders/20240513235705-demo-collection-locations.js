'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'CollectionLocations';

    await CollectionLocation.bulkCreate([
      { collectionId: 1, locationId: 1, createdAt: new Date(), updatedAt: new Date() },
      { collectionId: 1, locationId: 2, createdAt: new Date(), updatedAt: new Date() },
      { collectionId: 1, locationId: 3, createdAt: new Date(), updatedAt: new Date() },
      { collectionId: 2, locationId: 4, createdAt: new Date(), updatedAt: new Date() },
      { collectionId: 2, locationId: 5, createdAt: new Date(), updatedAt: new Date() },
      { collectionId: 3, locationId: 6, createdAt: new Date(), updatedAt: new Date() },
      { collectionId: 3, locationId: 7, createdAt: new Date(), updatedAt: new Date() },
      { collectionId: 4, locationId: 8, createdAt: new Date(), updatedAt: new Date() },
      { collectionId: 4, locationId: 9, createdAt: new Date(), updatedAt: new Date() },
      { collectionId: 5, locationId: 10, createdAt: new Date(), updatedAt: new Date() }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'CollectionLocations';

    await queryInterface.bulkDelete({}, {}, options);
  }
};
