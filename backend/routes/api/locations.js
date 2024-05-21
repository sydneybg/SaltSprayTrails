const express = require('express');
const { Location, LocationImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateLocation } = require('../../utils/validation');


const router = express.Router();

// GET all locations with pagination and associated location images
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, size = 20 } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const { count, rows } = await Location.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: LocationImage,
          as: 'LocationImages',
          attributes: ['id', 'imageUrl'],
        },
      ],
    });

    const totalPages = Math.ceil(count / limit);

    const locations = rows.map((location) => ({
      ...location.toJSON(),
      locationImages: location.locationImages,
    }));

    res.json({
      locations,
      currentPage: parseInt(page),
      totalPages,
      totalLocations: count,
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET all locations owned by the current user with associated location images
router.get('/current',
requireAuth,
async (req, res, next) => {
    try { //not necessary but using to figure out why requireauth isnt working
      if (!req.user) {
        return res.status(401).json({ message: 'You must be logged in to access this resource' });
      }
      const userId = req.user.id;
      const locations = await Location.findAll({
        where: { ownerId: userId },
        include: [
          {
            model: LocationImage,
            as: 'LocationImages',
            attributes: ['id', 'imageUrl'],
          },
        ],
      });

      const locationsWithImages = locations.map((location) => ({
        ...location.toJSON(),
        locationImages: location.LocationImages,
      }));

      res.json({ locations: locationsWithImages });
    } catch (err) {
      console.error('Error fetching locations for current user:', err);
      if (err.status === 401) {
        res.status(401).json({ message: err.errors.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });

// GET a specific location by ID with associated location images
router.get('/:id', async (req, res, next) => {
    try {
      const location = await Location.findByPk(req.params.id, {
        include: [
          {
            model: LocationImage,
            as: 'LocationImages',
            attributes: ['id', 'imageUrl'],
          },
        ],
      });

      if (!location) {
        return res.status(404).json({ message: 'Location could not be found' });
      }

      const locationData = location.toJSON();
      locationData.locationImages = locationData.LocationImages;
      delete locationData.LocationImages;

      res.json(locationData);
    } catch (error) {
      console.error('Error fetching location:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



  // POST create a new location
  router.post('/',
  requireAuth,
  validateLocation,
  async (req, res, next) => {
    try {
      const location = await Location.create({ ...req.body, ownerId: req.user.id });
      res.status(201).json(location);
    } catch (error) {
      console.error('Error creating location:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // PUT update an existing location
  router.put('/:id', requireAuth, validateLocation, async (req, res, next) => {
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
