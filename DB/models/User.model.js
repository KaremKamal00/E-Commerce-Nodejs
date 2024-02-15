import mongoose, { Schema,Types,model } from "mongoose";



const userSchema=new Schema({
userName:{
    type:String,
    required:[true,'userName Required'],
    min:[2,'Minimum length'],
    max:[20,'Maximum length'],
    lowerCase:true
},
password:{
    type:String,
    required:[true,'Password Required']
},
email:{
    type:String,
    unique:true,
    required:[true,'Password Required'],
    lowerCase:true
},
role:{
    type:String,
    enum:['Admin','User'],
    default:'User'
},
gender:{
    type:String,
    enum:['Male','Female'],
    default:'Male'
},
status:{
    type:String,
    enum:['Offline','Online'],
    default:'Offline'
},
confirmEmail:{
    type:Boolean,
    default:false
},
code:String,
age:Number,
phone:String,
address:String,
DOB:String,

wishList:[
    {
        type:Types.ObjectId,
        ref:"Product"
    }
]

},
{
    timestamps:true
})

// mongoose.model.userModel||
const userModel=model("User",userSchema)

export default userModel