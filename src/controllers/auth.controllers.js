const { model, Schema } = require('mongoose');

const UserModel = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        default: 'user_default'
    }
},{
    timestamps:true,
    versionKey:false
})

module.exports = model('Users', UserModel);