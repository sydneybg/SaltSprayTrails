'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Collections', [
      {
        userId: 1,
        name: 'Mountain Adventures',
        imageUrl: 'http://example.com/image/mountain.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        name: 'Beach Holidays',
        imageUrl: 'http://example.com/image/beach.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        name: 'Historic Sites',
        imageUrl: 'http://example.com/image/historic.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        name: 'Nature Walks',
        imageUrl: 'http://example.com/image/nature.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        name: 'City Breaks',
        imageUrl: 'http://example.com/image/city.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Collections', null, {});
  }
};
