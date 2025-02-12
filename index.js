const mongoose = require('mongoose');
const express = require("express");




// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://linozimerman:1234@cluster0.b01xfoi.mongodb.net/recipe-app';


let recetaFacil={
  title: "Empanada",
  level: "Easy Peasy",
  ingredients: ["carne","cebolla","papas","pimenton","huevos","aceite","perejil","comino","pimienta","sal"],
  cuisine: "Argentina",
  DishType: "other",
  image: "https://www.paulinacocina.net/wp-content/uploads/2022/01/empanadas-saltenas-800x535.jpg",
  duration: 30,
  creator: "Paulina"
}
const recetario = require("./data.json");
const query = { duration: 220 };

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((romoaldo) => {
    // Run your code here, after you have insured that the connection was made
    console.log("You've just deleted:",romoaldo);
    return Recipe.create(recetaFacil);
    //console.log(this.title);
  })
  .then((creation)=>{
    console.log("You've just created:",creation);;
   return Recipe.insertMany(recetario);
    //console.log(recetario.title)
  })
  .then((allRecipesArray)=>{
    //console.log(allRecipesArray);
    allRecipesArray.forEach((oneRecipe)=>{
      console.log(oneRecipe.title);
    })
    return Recipe.findOneAndUpdate(query, { $set: { duration: 100 }},{new:true});
    
  })
  .then((cambio)=>{
    console.log("success updating:", cambio.title, "is now", cambio.duration );
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((roberto)=>{
    console.log("Success deleting:",roberto);
    return mongoose.disconnect();
    // return mongoose.connection.close(); //other way to do it.
  })
  .then(()=> console.log("Connection closed"))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


