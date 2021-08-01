const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const { bool } = require('joi');
const Schema    = mongoose.Schema;


const XHistorySchema = mongoose.Schema([{
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
        default: null
    },
    status: {
        type: String,
        required: false,
        enum : ['pending', 'loss', 'win'],
        default: 'pending'
    },
}])
const TestSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'user',
    },
    name:{
        type: String,
        required: true,
    },
    xHistory: [XHistorySchema],
    created_at:{ type: Date, default: Date.now },
    updated_at:{ type: Date, default: Date.now },
    updated:{type: Date, default: Date.now}
}, {versionKey: false}, {strict: false})


const TestModel = mongoose.model('test', TestSchema);

module.exports  = TestModel;