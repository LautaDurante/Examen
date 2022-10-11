const {model,Schema}= require('mongoose');

require('./Users')

const TaskModel = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    idUser:{
        type:Schema.ObjectId,
        ref: 'Users',
        required:true
    }

    },{
        timestamps:true,
        versionKey:false   
    }
);


module.exports = model("Tasks", TaskModel);