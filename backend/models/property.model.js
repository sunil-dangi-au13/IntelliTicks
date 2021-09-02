const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    size: {type: String, required: true},
    date: {type: Date,required: true}
}, {
    timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;