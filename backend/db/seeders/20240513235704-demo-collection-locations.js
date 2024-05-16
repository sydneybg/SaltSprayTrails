'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CollectionLocations', [
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
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CollectionLocations', null, {});
  }
};
