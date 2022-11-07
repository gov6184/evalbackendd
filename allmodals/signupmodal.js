let mong=require("mongoose")
let smodal=mong.model("alltodouser",mong.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    ipaddress:{type:String, required:true}
}))
module.exports={
    smodal
}