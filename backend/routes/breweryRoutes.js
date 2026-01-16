const express = require('express');
const router = express.Router();
const breweryController = require('../controllers/breweryController');


router.get('/', breweryController.getAllBreweries);
router.get('/:id', breweryController.getBreweryById);
// router.post('/', breweryController.createBrewery);
// router.put('/:id', breweryController.updateBrewery);
// router.delete('/:id', breweryController.deleteBrewery);

module.exports = router;
