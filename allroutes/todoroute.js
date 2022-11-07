let exp=require("express")
let toroute=exp.Router()
let {tmodal}=require("../allmodals/todomodal")
require("dotenv").config()
let jwt=require("jsonwebtoken")
let validator=(req,res,next)=>{
    if(req.headers.authorization){
        let val=req.headers.authorization.split(" ")[1]
        jwt.verify(val,process.env.secretkey,(err,responce)=>{
            if(err){
                res.status(401).send("please try again after some time")}
                else{
                    req.email=responce["email"]
                    next()
                }
           
           
        })
    }else{
        res.status(401).send("someting went wrong")
    }
}
toroute.post("/todo/create",validator,async(req,res)=>{
    
    let {taskname,status,tag}=req.body;
    let newtodo=new tmodal({
        email:req.email,
        taskname,
        status,
        tag
    })
    await newtodo.save()
    res.send("added")
})
toroute.get("/todos",validator,async(req,res)=>{

    if(req.query.status || req.query.tag){
        let val=await tmodal.find({...req.query,email:req.email})
        res.send(val)
    }else{
        let val=await tmodal.find({email:req.email})
    res.send(val)
    }
    
})
toroute.get("/todos/:todoID",validator,async(req,res)=>{
    let idd=req.params.todoID
    console.log(req.socket.localAddress)
    let val=await tmodal.find({id:idd})
    res.send(val)
})
toroute.delete("/todo/:todoid",validator,async(req,res)=>{
    let idd=req.params.todoid
    let val=await tmodal.findOne({id:idd})
    if(val["email"]==req.email){
        let deletingval=await tmodal.findOneAndDelete({id:idd})
        res.send("deleted")
    }else{
        res.status(401).send("you cannnot delete this task")
    }
   
})

toroute.put("/todo/:todoid",validator,async(req,res)=>{
    let idd=req.params.todoid
    let val=await tmodal.findOne({id:idd})
    if(val["email"]==req.email){
        let deletingval=await tmodal.findOneAndReplace({id:idd},{$set:req.body})
        res.send("repleace")
    }else{
        res.status(401).send("you cannnot change this task")
    }
   
})
toroute.patch("/todo/:todoid",validator,async(req,res)=>{
    let idd=req.params.todoid
    let val=await tmodal.findOne({id:idd})
    if(val["email"]==req.email){
        let deletingval=await tmodal.findOneAndReplace({id:idd},{$set:req.body})
        res.send("updated")
    }else{
        res.status(401).send("you cannnot update this task")
    }
   
})
module.exports={
    toroute
}
