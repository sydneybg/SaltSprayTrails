'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Locations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'SET NULL'
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false
        },
        activity_type: {
          type: Sequelize.ENUM('swimming', 'surfing', 'rafting', 'kayaking'),
          allowNull: false,
        },
        street: {
          type: Sequelize.STRING,
          allowNull: false
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false
        },
        country: {
          type: Sequelize.STRING,
          allowNull: false
        },
        zip_code: {
          type: Sequelize.STRING,
          allowNull: false
        },
        latitude: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        longitude: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, options);

      // Indexes
      await queryInterface.addIndex('Locations', ['city']);
      await queryInterface.addIndex('Locations', ['state']);
      await queryInterface.addIndex('Locations', ['activity_type']);
    } catch (error) {
      console.error('Failed to execute migration:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      options.tableName = "Locations";
      await queryInterface.dropTable("Locations");
    } catch (error) {
      console.error('Failed to revert migration:', error);
      throw error;
    }
  }
};
