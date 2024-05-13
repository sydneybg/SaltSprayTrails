const express = require('express');
const { Op } = require('sequelize');
const { Location, Review } = require('../../db/models');

const router = express.Router();

// Get all locations
router.get('/', async (req, res) => {
  const { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  const limit = parseInt(size);
  const offset = (parseInt(page) - 1) * limit;

  const where = {};

  if (minLat) where.lat = { [Op.gte]: parseFloat(minLat) };
  if (maxLat) where.lat = { [Op.lte]: parseFloat(maxLat) };
  if (minLng) where.lng = { [Op.gte]: parseFloat(minLng) };
  if (maxLng) where.lng = { [Op.lte]: parseFloat(maxLng) };
  if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
  if (maxPrice) where.price = { [Op.lte]: parseFloat(maxPrice) };

  const locations = await Location.findAll({
    include: [Review],
    where,
    limit,
    offset,
  });

  const locationsWithRatings = locations.map((location) => {
    const reviews = location.Reviews;
    const numReviews = reviews.length;
    const avgRating = numReviews > 0 ? reviews.reduce((sum, review) => sum + review.stars, 0) / numReviews : null;

    return {
      ...location.toJSON(),
      avgRating,
    };
  });

  res.json({ locations: locationsWithRatings, page: parseInt(page), size: limit });
});

module.exports = router;
