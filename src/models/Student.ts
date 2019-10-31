import {Schema,model} from 'mongoose'

const StudentSchema =new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAd:{type:Date,default:Date.now}
})
export default model('student',StudentSchema)