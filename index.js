const eris = require("eris")

const Client = require("./Musicbot/index.js")

console.log("Started")

let client = new Client("NzY4MTg5Njk2NjQzMzAxNDk2.X482Zw.TU79bkF2LVUr13ZJKFQWUe8bZh4" , {
defaultImageFormat: "gif"
} , {prefix: "!"})

client.on("ready" , () => console.log("Ready!"))

const express = require("express");
const app = express();
app.listen(3000 , async () =>{})
app.use((req , res) => res.send("OK"))

process.on("unhandledRejection", (err) => {return;});