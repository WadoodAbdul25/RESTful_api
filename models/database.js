const mongoose = require('mongoose');
const subscriberSchema = mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    subscribedtochannel:{
        type:String,
        required:true
    },
    subscribedDate:{
        type:Date,
        required:true,
        default:Date.now
    }
})
const datamodel = mongoose.model('griff',subscriberSchema);

module.exports = datamodel;