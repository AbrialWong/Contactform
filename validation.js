//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const sassMiddleware = require("node-sass-middleware");
const { check, validationResult,oneOf } = require("express-validator");
const path = require("path");
const validator = require('validator');
const ejs = require("ejs");

const app = express();

// View Engine Setup
//app.set("views", path.join(__dirname));
app.set("view engine", "ejs");

//Sass middleware
app.use(
  sassMiddleware({
    /* Options */
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "css"),
    //debug: true,
    outputStyle: "compressed",
    prefix: "/css", // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  })
);
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use("/public", express.static(path.join(__dirname, "public")));

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/success", function(req,res){
    res.render("success");
})

// check() is a middleware used to validate
// the incomming data as per the fields
app.post(
  "/",
  [
    check("txtName", "Name length should be 10 to 50 characters")
    .isLength({
      min: 10,
      max: 50,
    }),
    check("txtEmail", "Email length should be 10 to 100 characters")
    .isEmail()
    .isLength({
        min: 10,
        max: 100,
      }),
    check("txtMessage", "Message length should be 10 to 100 characters")
    .isLength({
      min: 10,
      max: 100,
    })
  ],
  (req, res) => {
    // validationResult function checks whether 
    // any occurs or not and return an object 
    const errors = validationResult(req); 
  
    // If some error occurs, then this 
    // block of code will run 
    if (!errors.isEmpty()) { 
        res.json(errors) 
    } 
  
    // If no error occurs, then this 
    // block of code will run 
    else { 
        res.redirect("/success");
    } 
  });

app.listen(3000, function (req,res) { 
  console.log("Server is running on 3000");
});
