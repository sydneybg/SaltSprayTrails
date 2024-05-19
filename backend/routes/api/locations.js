const express = require('express');
const { Location } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateLocation, handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

// GET all locations with pagination
router.get('/', async (req, res, next) => {
    try {
      const { page = 1, size = 20 } = req.query;
      const limit = parseInt(size);
      const offset = (parseInt(page) - 1) * limit;

      const { count, rows } = await Location.findAndCountAll({
        limit,
        offset,
      });

      const totalPages = Math.ceil(count / limit);

      res.json({
        locations: rows,
        currentPage: parseInt(page),
        totalPages,
        totalLocations: count,
      });
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// GET a specific location by ID
router.get('/:id', async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.id);
      if (!location) {
        return res.status(404).json({ message: 'Location could not be found' });
      }
      res.json(location);
    } catch (error) {
      console.error('Error fetching location:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // GET all locations owned by the current user
router.get('/current', requireAuth, async (req, res, next) => {
    try {
      const userId = req.user.id;
      const locations = await Location.findAll({
        where: {
          userId: userId,
        },
      });

      res.json({ locations });
    } catch (error) {
      console.error('Error fetching locations for current user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // POST create a new location
  router.post('/', requireAuth, validateLocation, handleValidationErrors, async (req, res, next) => {
    try {
      const location = await Location.create(req.body);
      res.status(201).json(location);
    } catch (error) {
      console.error('Error creating location:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // PUT update an existing location
  router.put('/:id', requireAuth, validateLocation, handleValidationErrors, async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.id);
      if (!location) {
        return res.status(404).json({ message: 'Location could not be found' });
      }
      await location.update(req.body);
      res.json(location);
    } catch (error) {
      console.error('Error updating location:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // DELETE a location by ID
  router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.id);
      if (!location) {
        return res.status(404).json({ message: 'Location could not be found' });
      }
      await location.destroy();
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting location:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  // Add an Image to a Location based on the Location's id
router.post('/:locationId/images', requireAuth, async (req, res, next) => {
    try {
      const { locationId } = req.params;
      const { url, preview } = req.body;

      const location = await Location.findByPk(locationId);

      if (!location) {
        return res.status(404).json({ message: "Location couldn't be found" });
      }

      if (location.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const locationImage = await LocationImage.create({
        locationId: location.id,
        url,
        preview,
      });

      return res.json({
        id: locationImage.id,
        url: locationImage.url,
        preview: locationImage.preview,
      });
    } catch (error) {
      console.error('Error adding image to location:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;
