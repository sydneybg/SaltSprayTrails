// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }


// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Reviews', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'Users',
//           key: 'id'
//         },
//         onDelete: 'CASCADE'
//       },
//       locationId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'Locations',
//           key: 'id'
//         },
//         onDelete: 'CASCADE'
//       },
//       rating: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//       },
//       comment: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       }
//     }, options);
//   },

//   async down(queryInterface, Sequelize) {
//     options.tableName = "Reviews";
//     await queryInterface.dropTable(options);
//   }
// };
