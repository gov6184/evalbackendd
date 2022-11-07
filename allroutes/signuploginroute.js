let exp=require("express")
let slroute=exp.Router()
let bcrypt=require("bcrypt")
let {smodal}=require("../allmodals/signupmodal")
let jwt=require("jsonwebtoken")
require("dotenv").config()
const { token } = require("morgan")
slroute.post("/signup",(req,res)=>{
    let {email,password,age}=req.body;
    bcrypt.hash(password,5,async(err,hashval)=>{
        if(err)res.status(83).send("please try again after some time")
        console.log(hashval)
        let newtodouser=new smodal({
            email,
            password:hashval,
            ipaddress:req.socket.localAddress
        })
        await newtodouser.save()
        res.send("login Sucessful")
    })
})
slroute.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    let userinfo= await smodal.findOne({email:email})
    let hashpassword=userinfo["password"]
    bcrypt.compare(password,hashpassword,(err,result)=>{
        if(err)res.status(83).send("please try again after some time")
        if(result){
            jwt.sign({email:email},process.env.secretkey,(err,tokenn)=>{
                if(err)res.status(83).send("please try again after some time")
                res.send({token:tokenn})
            })
        }else{
            res.status(401).send("please signup")
        }
    })
})
module.exports={
    slroute
}