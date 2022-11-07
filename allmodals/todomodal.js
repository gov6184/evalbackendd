let mong=require("mongoose")
let tmodal=mong.model('alltodo',mong.Schema({
    id:{type:Number, required:true,default:Math.random()},
    email:{type:String, required:true},
    taskname:{type:String,required:true},
    status:{type:String,required:true,enum:["pending","done"]},
    tag:{type:String,required:true,enum:["personal","official",'family']}
}))
module.exports={
    tmodal
}
