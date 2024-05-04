const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantsSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    mealtype:{
        type:String,
        required:true
    },
    location_id: {
        type: Number,
        required: true
    },
    city_id : {
        type : Number,
        required : true
    },
    locality : {
        type : String,
        required : true
    },
    thumb : {
        type : Array,
        required : true
    },
    min_price : {
        type : Number,
        required : true
    },
    contact_number : {
        type : String,
        required : false
    },

    cuisine_id:{
        type:Array,
        required:true
    },
    cuisine:{
        type:Array,
        required:true
    },

    mealtype_id: {
        type: Number,
        required: true
    }









})

module.exports = mongoose.model('resturant', restaurantsSchema, 'restaurant');
