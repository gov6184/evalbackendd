let epxress=require("express")
let app= epxress()
let {connect}=require("./config/db")
let {toroute}=require("./allroutes/todoroute")
let {slroute}=require("./allroutes/signuploginroute")
app.use(epxress.json())
app.use(slroute)
app.use(toroute)
app.listen(8080,async()=>{
    try {
        await connect
        console.log("connected")
    } catch (error) {
        console.log("not connected")
    }
    console.log("connected to port 8080")
})