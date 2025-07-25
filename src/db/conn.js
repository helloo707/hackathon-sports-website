const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/firregister",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connecton successful")
}).catch((e)=>{
    console.log("error found: "+e)
})
