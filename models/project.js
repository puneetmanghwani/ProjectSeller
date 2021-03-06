const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments:[{
        name:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }]
})

module.exports = mongoose.model('Project', projectSchema);
