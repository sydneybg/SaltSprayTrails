const express = require('express');
const router = express.Router();
const { Collection } = require('../models');
const { CollectionLocation } = require('../models');


// Get all collections
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.findAll();
    res.json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a specific collection by ID
router.get('/:id', async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id);
    if (!collection) {
      res.status(404).json({ message: 'Collection not found' });
    } else {
      res.json(collection);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new collection
router.post('/', async (req, res) => {
  try {
    const { name, imageUrl, userId } = req.body;
    const collection = await Collection.create({ name, imageUrl, userId });
    res.status(201).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a collection
router.put('/:id', async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const collection = await Collection.findByPk(req.params.id);
    if (!collection) {
      res.status(404).json({ message: 'Collection not found' });
    } else {
      await collection.update({ name, imageUrl });
      res.json(collection);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a collection
router.delete('/:id', async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id);
    if (!collection) {
      res.status(404).json({ message: 'Collection not found' });
    } else {
      await collection.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all collection locations
router.get('/', async (req, res) => {
    try {
      const collectionLocations = await CollectionLocation.findAll();
      res.json(collectionLocations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // Add a location to a collection
  router.post('/', async (req, res) => {
    try {
      const { collectionId, locationId } = req.body;
      const collectionLocation = await CollectionLocation.create({ collectionId, locationId });
      res.status(201).json(collectionLocation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // Remove a location from a collection
  router.delete('/:id', async (req, res) => {
    try {
      const collectionLocation = await CollectionLocation.findByPk(req.params.id);
      if (!collectionLocation) {
        res.status(404).json({ message: 'Collection Location not found' });
      } else {
        await collectionLocation.destroy();
        res.sendStatus(204);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

module.exports = router;
