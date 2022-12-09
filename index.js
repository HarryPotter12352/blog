const express = require("express");
const fs = require("fs");
const path = require("path");
const showdown = require("showdown");

const app = express();
const blogs = fs.readdirSync(path.join(__dirname, "blog"))
const converter = new showdown.Converter()

app.get("/", (req, res) => {
    res.send("Hi")
})

app.get("/blog/:slug", (req, res) => {
    if(blogs.includes(`${req.params.slug}.md`)){
        var html = ""
        fs.readFile(`./blog/${req.params.slug}.md`, (err, data) => {
            html = data.toString()
            res.send(converter.makeHtml(html));
        })
        
    }
    else {
        res.send("no")
    }
    
})

app.listen(5500, () => {
    console.log("Working at 5500")
})