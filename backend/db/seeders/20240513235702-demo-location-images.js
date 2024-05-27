'use strict';

const { LocationImage } = require('../models');

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

// Location Images
const demoLocationImages = [
  {
    locationId: 1,
    imageUrl: 'https://www.takemefishing.org/getmedia/222750ef-0549-4972-ab7b-7f2d958f515e/Kayak-540x280.jpg',
  },
  {
    locationId: 1,
    imageUrl: 'https://www.takemefishing.org/getmedia/d03246f0-6d09-4ab5-8e72-494241f9f46c/Manatees-540x280.jpg',
  },
  {
    locationId: 2,
    imageUrl: 'https://www.alpsinluxury.com/blog/wp-content/uploads/2019/03/Morzine-canyon-de-nyon-credit-Valerie-Poret-768x510.jpg',
  },
  {
    locationId: 3,
    imageUrl: 'https://www.alpsinluxury.com/blog/wp-content/uploads/2019/03/kayaking-918464_960_720.jpg',
  },
  {
    locationId: 4,
    imageUrl: 'https://www.alpsinluxury.com/blog/wp-content/uploads/2019/03/waterfalls_fun_trees-1376159.jpg',
  },
  {
    locationId: 5,
    imageUrl: 'https://www.alpsinluxury.com/blog/wp-content/uploads/2019/03/image1-002-1-600x386.jpg',
  },
  {
    locationId: 6,
    imageUrl: 'https://www.alpsinluxury.com/blog/wp-content/uploads/2019/03/Hydrospeeding-Tarantiase-Tours-1.jpg',
  },
  {
    locationId: 7,
    imageUrl: 'https://www.alpsinluxury.com/blog/wp-content/uploads/2019/03/Paddle-board-Tignes.jpg',
  },
  {
    locationId: 8,
    imageUrl: 'https://cancunatv.com/wp-content/uploads/2023/01/extreme-water-activities-in-cancun-1-1024x768.jpg',
  },
  {
    locationId: 9,
    imageUrl: 'https://cdn.shopify.com/s/files/1/0569/0615/4154/files/GettyImages-693996514.jpg',
  },
  {
    locationId: 10,
    imageUrl: 'https://vermontvacation.com/wp-content/uploads/2024/01/webimage-20200704_vtlakedunmore-3.png',
  },
  {
    locationId: 4,
    imageUrl: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_avif,g_xy_center,h_336,q_65,w_578,x_2091,y_1869/v1/clients/pagecountyva/Main_Things_KayakCanoeTube_243088ed-3c19-427c-9899-721bde276364.jpg',
  },
  {
    locationId: 5,
    imageUrl: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_avif,g_xy_center,h_336,q_65,w_578,x_3551,y_2256/v1/clients/pagecountyva/Page_River_Stock_Overlooks_Full_RES_1011_177f1423-6f20-49e1-9ece-ce2ebb922ad1.jpg',
  },
  {
    locationId: 6,
    imageUrl: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_avif,g_xy_center,h_336,q_65,w_578,x_3187,y_2866/v1/clients/pagecountyva/Page_River_Stock_Overlooks_Full_RES_1005a_da4be3c8-bcf8-4fa8-a669-bba5fc250ebd.jpg',
  },
  {
    locationId: 7,
    imageUrl: 'https://nowboarding.changiairport.com/travel-the-world/exploration-of-cebu-natural-wonders.img.png/1703056903633.jpg',
  },
  {
    locationId: 8,
    imageUrl: 'https://pontoonsaloontn.com/wp-content/uploads/2022/12/river-queen-voyages-kayaks.jpg',
  },
  {
    locationId: 9,
    imageUrl: 'https://pontoonsaloontn.com/wp-content/uploads/2022/12/cummins-falls.jpg',
  },
  {
    locationId: 10,
    imageUrl: 'https://www.fs.usda.gov/Internet/FSE_MEDIA/fseprd1051139.jpg',
  }
];

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'LocationImages';
    await LocationImage.bulkCreate(demoLocationImages, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'LocationImages';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {}, {});
  }
};
