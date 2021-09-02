const router = require('express').Router();
let Property = require('../models/property.model');

router.route('/').get((req,res) => {
    Property.find()
        .then(property => res.json(property))
        .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const size = req.body.size;
    const date = Date.parse(req.body.date);

    const newProperty = new Property({username, description, size, date});

    newProperty.save()
        .then(() => res.json('Property added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res) => {
    Property.findById(req.params.id)
        .then(property => res.json(Property))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res) => {
    Property.findByIdAndDelete(req.params.id)
        .then(property => res.json('Property deleted'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res) => {
    Property.findById(req.params.id)
        .then(property => {
            property.username = req.body.username;
            property.description = req.body.description;
            property.size = req.body.size;
            property.date = Date.parse(req.body.date);

            property.save()
                .then(() => res.json('Property updated !'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;