// structure of database

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    term: String,
                      when: Date
}, {timestamps: true});

const ModelClass = mongoose.model('image_db.js', imageSchema);

module.exports=ModelClass;