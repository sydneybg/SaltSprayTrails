'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';

    await queryInterface.bulkInsert([
      {
        userId: 1,
        locationId: 1,
        rating: 5,
        comment: 'Fantastic place to visit!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        locationId: 2,
        rating: 4,
        comment: 'Beautiful views but crowded.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        locationId: 3,
        rating: 3,
        comment: 'Nice, but a bit pricey for what you get.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        locationId: 1,
        rating: 2,
        comment: 'The place was underwhelming and lacked facilities.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        locationId: 4,
        rating: 5,
        comment: 'An excellent spot for relaxation and fun activities!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        locationId: 5,
        rating: 4,
        comment: 'Great for family outings, though a bit noisy.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        locationId: 6,
        rating: 4,
        comment: 'Lovely place, will come back next summer.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        locationId: 7,
        rating: 3,
        comment: 'Decent but not as clean as expected.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 8,
        locationId: 8,
        rating: 5,
        comment: 'Simply the best experience of my life!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 9,
        locationId: 9,
        rating: 1,
        comment: 'Disappointing visit, not worth the hype.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 9,
        locationId: 8,
        rating: 5,
        comment: 'Perfect location with breathtaking views!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        locationId: 4,
        rating: 4,
        comment: 'Really nice, but could use more parking spaces.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        locationId: 5,
        rating: 2,
        comment: 'Overrated and overly expensive for no good reason.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        locationId: 6,
        rating: 5,
        comment: 'A must-visit! Absolutely loved it!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        locationId: 7,
        rating: 3,
        comment: 'It was okay, nothing spectacular.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        locationId: 8,
        rating: 4,
        comment: 'Good place but too crowded on weekends.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        locationId: 9,
        rating: 2,
        comment: 'Not very clean, and staff were rude.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        locationId: 9,
        rating: 4,
        comment: 'Enjoyable visit, kids had a lot of fun.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 8,
        locationId: 1,
        rating: 5,
        comment: 'Incredible place, highly recommended!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 9,
        locationId: 2,
        rating: 5,
        comment: 'Had a fantastic time, will definitely come back!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 8,
        locationId: 3,
        rating: 4,
        comment: 'Good experience overall, but a little crowded.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';

    await queryInterface.bulkDelete({}, {}, options);
  }
};
