const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const { bool } = require('joi');
const Schema    = mongoose.Schema;

const SellSchema = new Schema({

    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    mobileNo:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    modelNo:{
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    created_at:{ type: Date, default: Date.now },
    updated_at:{ type: Date, default: Date.now },
    updated:{type: Date, default: Date.now}
}, {versionKey: false}, {strict: false})


const SellModel = mongoose.model('sell', SellSchema);

module.exports  = SellModel;