const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const { bool } = require('joi');
const Schema    = mongoose.Schema;

const BidHistorySchema = mongoose.Schema([{
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'user',
        default: null
    },
    bidAmount: {
        type: Number,
        required: false,
        default: null
      },
    bidTime: {
        type: Date,
        required: false,
        default: new Date(),
    },
    status: {
        type: String,
        required: false,
        enum : ['pending', 'loss', 'win'],
        default: 'pending'
    },
}])
const ProductSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    name:{
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
    description:{
        type: String,
        required: true,
    },
    auctionExpireAt:{ 
        type: Date,
        required: false,
        default: null
    },
    startingPrice:{ 
        type: Number,
        required: false,
        default: null
    },
    images:{ 
        type: Array,
        required: false,
        default: []
    },
    confirmationCode:{ 
        type: String,
        required: false,
        default: null
    },
    status:{ 
        type: String,
        enum : ['pending', 'deactivated', 'live', 'finished', 'sold'],
        default: 'pending' 
    },
    box:{
        type: Boolean,
        required: true
    },
    papers:{
        type: Boolean,
        required: true
    },
    watchAge:{
        type: Date,
        required: true
    },
    movement: {
        type: String,
        required: true
    },
    case: {
        type: String,
        required: true
    },
    bracelet: {
        type: String,
        required: true
    },
    dial: {
        type: String,
        required: true
    },
    lot: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    bidHistory: [BidHistorySchema],
    created_at:{ type: Date, default: Date.now },
    updated_at:{ type: Date, default: Date.now },
    updated:{type: Date, default: Date.now}
}, {versionKey: false}, {strict: false})


const ProductModel = mongoose.model('product', ProductSchema);

module.exports  = ProductModel;