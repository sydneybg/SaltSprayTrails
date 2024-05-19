const express = require('express');
const { Location } = require('../../db/models');

const router = express.Router();

// GET all locations
router.get('/', async (req, res, next) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    next(error);
  }
});

// GET a specific location by ID
router.get('/:id', async (req, res, next) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    next(error);
  }
});

// POST create a new location
router.post('/', async (req, res, next) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    next(error);
  }
});

// PUT update an existing location
router.put('/:id', async (req, res, next) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    await location.update(req.body);
    res.json(location);
  } catch (error) {
    next(error);
  }
});

// DELETE a location by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    await location.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
