'use strict';

const { Location } = require('../models');

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

// Locations
const demoLocations = [
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
    longitude: -122.4194,
    ownerId: 1
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
    longitude: -74.0060,
    ownerId: 2
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
    longitude: -121.8863,
    ownerId: 3
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
    longitude: -87.6298,
    ownerId: 4
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
    longitude: -93.2650,
    ownerId: 5
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
    longitude: -122.4194,
    ownerId: 6
  },
  {
    name: 'Wildflower Meadow',
    description: 'Meadow filled with colorful wildflowers',
    activity_type: 'Nature Viewing',
    street: '159 Meadow Ln',
    city: 'City 7',
    state: 'State 7',
    country: 'Country 7',
    zip_code: '86420',
    latitude: 39.7392,
    longitude: -104.9903,
    ownerId: 7
  },
  {
    name: 'Desert Canyon',
    description: 'Stunning canyon in the desert landscape',
    activity_type: 'Hiking',
    street: '753 Canyon Rd',
    city: 'City 8',
    state: 'State 8',
    country: 'Country 8',
    zip_code: '24601',
    latitude: 36.1699,
    longitude: -115.1398,
    ownerId: 8
  },
  {
    name: 'Snowy Mountain Resort',
    description: 'Ski resort with powdery snow and ski trails',
    activity_type: 'Skiing',
    street: '951 Ski Slope',
    city: 'City 9',
    state: 'State 9',
    country: 'Country 9',
    zip_code: '13579',
    latitude: 39.6383,
    longitude: -106.3742,
    ownerId: 9
  },
  {
    name: 'Tropical Island Retreat',
    description: 'Relaxing retreat on a tropical island',
    activity_type: 'Beach Activities',
    street: '246 Palm St',
    city: 'City 10',
    state: 'State 10',
    country: 'Country 10',
    zip_code: '86420',
    latitude: 21.3069,
    longitude: -157.8583,
    ownerId: 10
  },
  {
    name: 'Historic Landmarks Tour',
    description: 'Tour of historic landmarks and monuments',
    activity_type: 'Sightseeing',
    street: '369 History Ave',
    city: 'City 11',
    state: 'State 11',
    country: 'Country 11',
    zip_code: '97531',
    latitude: 38.9072,
    longitude: -77.0369,
    ownerId: 1
  },
  {
    name: 'Waterfall Hike',
    description: 'Hike to a stunning waterfall in the forest',
    activity_type: 'Hiking',
    street: '741 Forest Trail',
    city: 'City 12',
    state: 'State 12',
    country: 'Country 12',
    zip_code: '24601',
    latitude: 47.6062,
    longitude: -122.3321,
    ownerId: 2
  },
  {
    name: 'Ski Lodge Getaway',
    description: 'Cozy ski lodge with access to ski slopes',
    activity_type: 'Skiing',
    street: '852 Ski Lodge Rd',
    city: 'City 13',
    state: 'State 13',
    country: 'Country 13',
    zip_code: '13579',
    latitude: 45.5051,
    longitude: -122.6750,
    ownerId: 3
  },
  {
    name: 'Coastal Bike Trail',
    description: 'Scenic bike trail along the coastline',
    activity_type: 'Biking',
    street: '963 Coast Hwy',
    city: 'City 14',
    state: 'State 14',
    country: 'Country 14',
    zip_code: '86420',
    latitude: 34.0522,
    longitude: -118.2437,
    ownerId: 4
  },
  {
    name: 'Mountain Lake Fishing',
    description: 'Fishing spot at a serene mountain lake',
    activity_type: 'Fishing',
    street: '147 Lake Shore Dr',
    city: 'City 15',
    state: 'State 15',
    country: 'Country 15',
    zip_code: '97531',
    latitude: 39.0742,
    longitude: -120.1792,
    ownerId: 5
  },
  {
    name: 'Desert Oasis Campground',
    description: 'Campground with an oasis in the desert',
    activity_type: 'Camping',
    street: '258 Oasis Rd',
    city: 'City 16',
    state: 'State 16',
    country: 'Country 16',
    zip_code: '24601',
    latitude: 33.8734,
    longitude: -115.9010,
    ownerId: 6
  },
  {
    name: 'Vineyard Tour and Tasting',
    description: 'Tour and wine tasting at a picturesque vineyard',
    activity_type: 'Wine Tasting',
    street: '369 Vineyard Ln',
    city: 'City 17',
    state: 'State 17',
    country: 'Country 17',
    zip_code: '13579',
    latitude: 38.2982,
    longitude: -122.2900,
    ownerId: 7
  },
  {
    name: 'River Rafting Adventure',
    description: 'Exciting river rafting experience',
    activity_type: 'Rafting',
    street: '741 River Rapids Rd',
    city: 'City 18',
    state: 'State 18',
    country: 'Country 18',
    zip_code: '86420',
    latitude: 38.5737,
    longitude: -109.5498,
    ownerId: 8
  },
  {
    name: 'Coastal Wildlife Sanctuary',
    description: 'Sanctuary for coastal wildlife and bird watching',
    activity_type: 'Wildlife Viewing',
    street: '852 Sanctuary Way',
    city: 'City 19',
    state: 'State 19',
    country: 'Country 19',
    zip_code: '97531',
    latitude: 27.9378,
    longitude: -82.4902,
    ownerId: 9
  },
  {
    name: 'Hot Springs Retreat',
    description: 'Relaxing retreat with natural hot springs',
    activity_type: 'Spa and Wellness',
    street: '963 Hot Springs Ln',
    city: 'City 20',
    state: 'State 20',
    country: 'Country 20',
    zip_code: '24601',
    latitude: 44.5646,
    longitude: -110.8281,
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
          'Location 1',
          'Sunset Beach',
          'Mountain Peak Trail',
          'Riverside Park',
          'Lakeside Campground',
          'Coastal Cliffs',
          'Wildflower Meadow',
          'Desert Canyon',
          'Snowy Mountain Resort',
          'Tropical Island Retreat',
          'Historic Landmarks Tour',
          'Waterfall Hike',
          'Ski Lodge Getaway',
          'Coastal Bike Trail',
          'Mountain Lake Fishing',
          'Desert Oasis Campground',
          'Vineyard Tour and Tasting',
          'River Rafting Adventure',
          'Coastal Wildlife Sanctuary',
          'Hot Springs Retreat'
        ]
      }
    }, {});
  }
};
