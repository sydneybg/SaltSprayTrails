'use strict';

const { Location } = require('../models');

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

// Locations
const demoLocations = [
  {
    name: 'Sunset Beach',
    description: 'Beautiful beach with perfect waves for surfing',
    activity_type: 'surfing',
    street: '456 Ocean Ave',
    city: 'Coastville',
    state: 'California',
    country: 'USA',
    zip_code: '54321',
    latitude: 34.0259,
    longitude: -118.7798,
    ownerId: 1
  },
  {
    name: 'Riverside Rapids',
    description: 'Exciting rapids for whitewater rafting adventures',
    activity_type: 'rafting',
    street: '789 River Rd',
    city: 'Rapidstown',
    state: 'Colorado',
    country: 'USA',
    zip_code: '98765',
    latitude: 38.4617,
    longitude: -105.8701,
    ownerId: 2
  },
  {
    name: 'Lakeside Swimming Cove',
    description: 'Serene lake with a designated swimming area',
    activity_type: 'swimming',
    street: '321 Lake St',
    city: 'Lakeville',
    state: 'Michigan',
    country: 'USA',
    zip_code: '24680',
    latitude: 44.2558,
    longitude: -85.4041,
    ownerId: 3
  },
  {
    name: 'Coastal Kayak Launch',
    description: 'Scenic coastal spot perfect for kayaking',
    activity_type: 'kayaking',
    street: '159 Coast Hwy',
    city: 'Kayakville',
    state: 'Oregon',
    country: 'USA',
    zip_code: '13579',
    latitude: 44.6067,
    longitude: -124.0529,
    ownerId: 4
  },
  {
    name: 'Surfer\'s Paradise',
    description: 'World-renowned beach known for its excellent surfing conditions',
    activity_type: 'surfing',
    street: '753 Surfer\'s Way',
    city: 'Surftown',
    state: 'Hawaii',
    country: 'USA',
    zip_code: '86420',
    latitude: 21.6700,
    longitude: -158.0500,
    ownerId: 5
  },
  {
    name: 'Whitewater Rafting Center',
    description: 'Adventure center offering guided whitewater rafting trips',
    activity_type: 'rafting',
    street: '951 Rafting Ln',
    city: 'Whitewaterville',
    state: 'Utah',
    country: 'USA',
    zip_code: '24601',
    latitude: 40.5912,
    longitude: -111.6410,
    ownerId: 6
  },
  {
    name: 'Crystal Clear Swimming Hole',
    description: 'Natural swimming hole with crystal clear water',
    activity_type: 'swimming',
    street: '741 Spring St',
    city: 'Springville',
    state: 'Florida',
    country: 'USA',
    zip_code: '97531',
    latitude: 28.8146,
    longitude: -81.7170,
    ownerId: 7
  },
  {
    name: 'Kayak Rental Center',
    description: 'Kayak rental center with access to calm coastal waters',
    activity_type: 'kayaking',
    street: '852 Kayak Cove',
    city: 'Paddletown',
    state: 'Washington',
    country: 'USA',
    zip_code: '13579',
    latitude: 47.6062,
    longitude: -122.3321,
    ownerId: 8
  },
  {
    name: 'Surf Camp',
    description: 'Surf camp with lessons for beginners and experienced surfers',
    activity_type: 'surfing',
    street: '963 Surf Camp Rd',
    city: 'Waveville',
    state: 'California',
    country: 'USA',
    zip_code: '86420',
    latitude: 34.4208,
    longitude: -119.6982,
    ownerId: 9
  },
  {
    name: 'Rafting Expedition Outfitter',
    description: 'Outfitter offering multi-day rafting expeditions',
    activity_type: 'rafting',
    street: '147 Expedition Way',
    city: 'Raftingville',
    state: 'Idaho',
    country: 'USA',
    zip_code: '24601',
    latitude: 44.0682,
    longitude: -114.7420,
    ownerId: 10
  }
];

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Locations';
    await Location.bulkCreate(demoLocations, options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Locations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: [
          'Sunset Beach',
          'Riverside Rapids',
          'Lakeside Swimming Cove',
          'Coastal Kayak Launch',
          'Surfer\'s Paradise',
          'Whitewater Rafting Center',
          'Crystal Clear Swimming Hole',
          'Kayak Rental Center',
          'Surf Camp',
          'Rafting Expedition Outfitter'
        ]
      }
    }, {});
  }
};
