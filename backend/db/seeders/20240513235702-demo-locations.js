'use strict';
const { Location } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Location.bulkCreate([
      {
        name: 'Location 1',
        description: 'Description of location 1',
        activity_type: 'Hiking',
        street: '123 Main St',
        city: 'City 1',
        state: 'State 1',
        country: 'Country 1',
        zip_code: '12345',
        latitude: 37.7749,
        longitude: -122.4194
      },
      {
        name: 'Sunset Beach',
        description: 'Beautiful beach with stunning sunsets',
        activity_type: 'Swimming',
        street: '456 Ocean Ave',
        city: 'City 2',
        state: 'State 2',
        country: 'Country 2',
        zip_code: '54321',
        latitude: 40.7128,
        longitude: -74.0060
      },
      {
        name: 'Mountain Peak Trail',
        description: 'Challenging hiking trail with breathtaking views',
        activity_type: 'Hiking',
        street: '789 Trail Rd',
        city: 'City 3',
        state: 'State 3',
        country: 'Country 3',
        zip_code: '98765',
        latitude: 37.3382,
        longitude: -121.8863
      },
      {
        name: 'Riverside Park',
        description: 'Scenic park along the river with picnic areas',
        activity_type: 'Picnicking',
        street: '321 River St',
        city: 'City 4',
        state: 'State 4',
        country: 'Country 4',
        zip_code: '24680',
        latitude: 41.8781,
        longitude: -87.6298
      },
      {
        name: 'Lakeside Campground',
        description: 'Campground with access to a serene lake',
        activity_type: 'Camping',
        street: '654 Lake Rd',
        city: 'City 5',
        state: 'State 5',
        country: 'Country 5',
        zip_code: '13579',
        latitude: 44.9778,
        longitude: -93.2650
      },
      {
        name: 'Coastal Cliffs',
        description: 'Scenic cliffs overlooking the ocean',
        activity_type: 'Sightseeing',
        street: '987 Cliff Dr',
        city: 'City 6',
        state: 'State 6',
        country: 'Country 6',
        zip_code: '97531',
        latitude: 37.7749,
        longitude: -122.4194
      },
      {
        name: 'Wildflower Meadow'
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Locations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Location 1'] }
    }, {});
  }
};
