const express  =require("express");
require("./db/conn");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
const document = dom.window.document;


const mongoose = require('mongoose');
const Products = require('./models/Product');

const User = require("./models/Userinfo");
const secure_user = require("./models/very_secure_file");
const cart_info = require("./models/cart");
const {MongoClient} = require('mongodb');
const client = new MongoClient("mongodb://0.0.0.0:27017/MWA/users");
const databasename = 'MWA';
const { listen } = require("express/lib/application");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000
const hbs = require('hbs');
const { registerPartials } = require('hbs')
var myDocument = User.findOne();


const ejs = require('ejs');

app.set('view engine', 'ejs');

// ---------------------------------------------------------------------------------------------------------------------------
//setting path 
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");

// ---------------------------------------------------------------------------------------------------------------------------
//middleware
app.use(express.urlencoded({extented:false}))
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(staticpath));
//app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);
app.set('view engine', 'ejs');

// ---------------------------------------------------------------------------------------------------------------------------
//routing
app.get("/index",(req,res)=>{
    res.render("index");
})
app.get("/homepage",(req,res)=>{
    res.render("homepage")
})
app.get("/login_page",(req, res) => {
    res.render("login_page")
  });
app.get("/cart",(req,res)=>{
    res.render("cart")
})
app.get("/sign_up",(req,res)=>{
    res.render("sign_up")
})

app.get('/Product', async (req, res) => {
  try {
    const name = req.query.name;
    const products = await Products.findOne({ name: { $regex: new RegExp(name, 'i') } });
    res.render('Product', { products: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// app.get('/Product', async (req, res) => {
//     console.log("WE in bois")
//     Product.find({}).then(function(err, product){
//         if(err){
//             console.log("err");
//         }else{
//             res.json(product)
//         }
//     })
//   });

app.listen(8080, () => {
  console.log(`Server is listening on port ${8080}`);
});
//---------------------------------------------------------------------------------------------------------------------------
//post

app.post("/login_page", async(req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const useremail = await secure_user.findOne({ email: email });

      if(useremail.password===password){
        res.status(201)
        console.warn("hello");
        res.render("index");
      }
      else{
        res.send("Invalid Password ");
      }

    } catch (error) {
      res.status(400).send("Invalid Email");
    }
});


app.post("/contact",async(req,res)=>{
    try{
        //res.send(req.body)
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render('index')
    } catch (error){
        res.status(500).send(error);
    }
})

app.post("/sign_up",async(req,res)=>{
    try{
        //res.send(req.body)
        const email = req.body.email
        if(secure_user.findOne({ email: email })){
            
            res.send("Email Already in use");
            alert("NOnsense");
            console.log("Exists");
        }
        else
        {
            const userData = new secure_user(req.body);
            await userData.save();
            res.status(201).render('login_page');
        }
    } catch (error){
        res.status(500).send(error);
    }
});

// app.post("/Product",async(req,res)=>{
//     try{
//         // //res.send(req.body)
//         // const userData = new User(req.body);
//         // await userData.save();
//         // res.status(201).render('index')
//         const item_name=req.body.name
//         if( cart_info.find({item_name}))
//         {
            
//         }
//         console.log(item_name)
//         res.render("index")
//     } catch (error){
//         res.status(500).send(error);
//     }
// })

// ---------------------------------------------------------------------------------------------------------------------------
//server create
app.listen(port,()=>{
    console.log(`Server Is Up:${port}`)
})