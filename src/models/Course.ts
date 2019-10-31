import {Schema,model} from 'mongoose'

const CourseSchema=new Schema({
    name:{type:String,required:true},
    url:{type:String,required:true,unique:true,lowercase:true},
    content:{type:String,required:true},
    image:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date},
    students:[{
        type:Schema.Types.ObjectId,
        ref:'student'
    }]
})

export default model('course',CourseSchema)