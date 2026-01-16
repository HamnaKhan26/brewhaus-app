const breweryService = require('../services/breweryService');

const getAllBreweries = async (req, res) => {
    try {
        //GET https://api.openbrewerydb.org/v1/breweries?by_name=san_diego&per_page=3
        console.log(req.query);
        const { page = 1, per_page = 10, by_name= ''} = req.query;
        const breweries = await breweryService.getAllBreweries(page, per_page, by_name);
        res.json(breweries);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    };
}

const getBreweryById = async (req, res) => {
    try {
        const brewery = await breweryService.getBreweryById(req.params.id);
        if(brewery) {
            res.json(brewery);
        } else {
            res.status(404).json({ error: 'Brewery not found' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllBreweries,
    getBreweryById
}