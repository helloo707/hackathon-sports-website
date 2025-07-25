const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
require("./db/conn");
const port= 80;
const register=require("./models/register");


const static_path=path.join(__dirname,"../public");
const templates_path=path.join(__dirname,"../templates/views");
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
app.set("views",templates_path);

app.get("/",(req,res)=>{
    res.render("index");
    res.status(200);
});

app.get("/login",(req,res)=>{
    res.render("login");
    res.status(200);
});

app.get("/cricket",(req,res)=>{
    res.render("cricket");
    res.status(200);
});

app.get("/sports",(req,res)=>{
    res.render("sports");
    res.status(200);
});
app.get("/cricket",(req,res)=>{
    res.render("diet");
    res.status(200);
});
app.get("/batting",(req,res)=>{
    res.render("batting");
    res.status(200);
});
app.get("/bowling",(req,res)=>{
    res.render("bowling");
    res.status(200);
});
app.get("/keeper",(req,res)=>{
    res.render("keeper");
    res.status(200);
});
app.get("/diet",(req,res)=>{
    res.render("diet");
    res.status(200);
});

app.post('/register',async (req,res)=>{
    try {
        const password= req.body.password;
        const cpassword= req.body.confirmpassword;
        if(password===cpassword){
            const registerCustomer=new register({
                Name:req.body.Name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })
            const registered=await registerCustomer.save();
            res.status(201).render("index");
        }else{
            res.send("passwords not matching")
        }
    } 
    catch (error) {
        res.status(404).send(error)
    }
})


app.post('/login',async (req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;

        const useremail=await register.findOne({email:email});
        
        if (useremail.password===password) {
            res.status(200).render("index")
        }else{
            res.send("invalid username or password")
        }
    } catch (error) {
        res.status(400).send("passwords not matching"+error)
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});