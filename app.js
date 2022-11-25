const express=require('express')
const app=express()
const fs= require('fs');
app.use(express.json())
app.use(express.urlencoded({extended:false}));
const PORT=5000;
app.set('view engine','ejs')
app.set('s','./views')
app.get("/",(req,res)=>{
    res.render('home')
})
app.get("/login",(req,res)=>{
    res.render('login')
})
app.get("/registration",(req,res)=>{
    res.render('registration',{errmsg:'',successmsg:''});
})
app.post("/postdata",(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    
    const age=req.body.age;
    const city=req.body.city;

    let data=('name :'+name+ '\nEmail :'+email+ '\nPassword :'+password+ '\nAge : '+age+ '\nCity'+city);
    if(!fs.existsSync(`./users/${email}`)){
        fs.mkdirSync(`./users/${email}`);
        fs.writeFileSync(`./users/${email}/details.txt`,`${data.toString()}`);
        res.render('registration',{successmsg:'User registered successfully',errmsg:''});
    }
    else{
        res.render('registration',{errmsg:'User Already Exists',successmsg:''});
    }

})

app.listen(PORT)