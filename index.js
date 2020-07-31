// running ui on localhost
const http = require('http');
const path = require('path');
const fs = require('fs')

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        fs.readFile("./bot/index.html","UTF-8",function(err,html){
            res.writeHead(200,{"Content-Type":"text/html"});
            res.end(html);
        });
    }
    else if(req.url.match("\.css$") || req.url.match("\.scss$")){
        var cssPath = path.join(__dirname,'bot',req.url);
        var fileStream = fs.createReadStream(cssPath,"UTF-8");
        if(req.url.match("\.css$")){
            res.writeHead(200,{"Content-Type":"text/css"});
        }
        else{
            res.writeHead(200,{"Content-Type":"text/scss"});
        }
        fileStream.pipe(res);
    }
    else if(req.url.match("\.png$")){
        var imagePath = path.join(__dirname,'bot',req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200,{"Content-Type":"image/png"});
        fileStream.pipe(res);
    }
    else if(req.url.match("\.jfif$")){
        var imagePath = path.join(__dirname,'bot',req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200,{"Content-Type":"image/jfif"});
        fileStream.pipe(res);
    }
    else{
        var jsPath = path.join(__dirname,'bot',req.url);
        var fileStream = fs.createReadStream(jsPath,"UTF-8");
        res.writeHead(200,{"Content-Type":"text/js"});
        fileStream.pipe(res);
    }
}).listen(5000)
//Actual Logic
const exp = require('express');
const bodyParser = require('body-parser');
const app = exp();
app.use(bodyParser.urlencoded({
    extended:false
}));
//cors settings
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
  const rep = require('./data.js');
  var prev = [];//use to hold series of categories selected
  var cat;//use to hold question number to provide answers
  var fallback = "Sorry your request is invalid<br>Select appropriate option from above category";
  function resolve(msg){
      var a;
    if(msg === "hi" || msg === "hello")
    {
        a = rep.menu;
        prev.length=0;
        prev.push("menu");
        return a;
    }
    else if(prev[prev.length-1] === "menu")
    {
        if(msg == "1")
        {
            a = rep.menu1;
            prev.push("menu1");
        }
        else if(msg == "2")
        {
            a = rep.menu2c;
            prev.push("menu2c");
        }
        else if(msg == "3")
        {
            a = rep.menu3q;
            prev.push("menu3q");
        }
        else if(msg == "4")
        {
            a = rep.menu4c;
            prev.push("menu4c");
        }
        else if(msg == "5")
        {
            a = rep.menu5c;
            prev.push("menu5c");
        }
        else{
            return fallback;
        }
    }
    //handling general issues categories,questions and answers
    else if(prev[prev.length-1] === "menu1")
    {
        if(rep.menu1q[Number(msg)-1] != undefined)
        {
            cat = Number(msg)-1;
            a = rep.menu1q[cat];
            prev.push("menu1q");
        }
        else if(msg == "*")
        {
            a = rep.optmenu;
            prev.pop();
            return a;
        }
        else{
            return fallback;
        }
    }
    else if(prev[prev.length-1] === "menu1q")
    {
        if(rep.menu1a[cat][Number(msg)-1] != undefined){
            a = rep.menu1a[cat][Number(msg)-1];
            prev.push("menu1a")
        }
        else if(msg == "*"){
            a = rep.menu1;
            prev.pop();
        }
        else{
            return fallback;
        }
    }
    else if(prev[prev.length-1] === "menu1a")
    {
        if(msg == "*"){
            a = rep.menu1q[cat];
            prev.pop();
        }
        else{
            return fallback;
        }
    }
    //categories,question,ans or lp1
    else if(prev[prev.length-1] === "menu2c")
    {
        if(rep.menu2q[Number(msg)-1] != undefined)
        {
            cat = Number(msg)-1;
            a = rep.menu2q[cat];
            prev.push("menu2q");
        }
        else if(msg == "*")
        {
            a = rep.optmenu;
            prev.pop();
            return a;
        }
        else{
            return fallback;
        }
    }
    else if(prev[prev.length-1] === "menu2q")
    {
        if(rep.menu2a[cat][Number(msg)-1] != undefined){
            a = rep.menu2a[cat][Number(msg)-1];
            prev.push("menu2a")
        }
        else if(msg == "*"){
            a = rep.menu2c;
            prev.pop();
        }
        else{
            return fallback;
        }
    }
    else if(prev[prev.length-1] === "menu2a")
    {
        if(msg == "*"){
            a = rep.menu2q[cat];
            prev.pop();
        }
        else{
            return fallback;
        }
    }
    //lp2
    else if(prev[prev.length-1] === "menu3q")
    {
        if(rep.menu3a[Number(msg)-1] != undefined)
        {
            cat = Number(msg)-1;
            a = rep.menu3a[cat];
            prev.push("menu3a");
        }
        else if(msg == "*")
        {
            a = rep.optmenu;
            prev.pop();
            return a;
        }
        else{
            return fallback;
        }
    }
    else if(prev[prev.length-1] === "menu3a")
    {
        if(msg == "*"){
            a = rep.menu3q;
            prev.pop();
        }
        else{
            return fallback;
        }
    }
    //lp3
    else if(prev[prev.length-1] === "menu4c")
    {
        if(rep.menu4q[Number(msg)-1] != undefined)
        {
            cat = Number(msg)-1;
            a = rep.menu4q[cat];
            prev.push("menu4q");
        }
        else if(msg == "*")
        {
            a = rep.optmenu;
            prev.pop();
            return a;
        }
        else{
            return fallback;
        }
    }
    else if(prev[prev.length-1] === "menu4q")
    {
        if(rep.menu4a[cat][Number(msg)-1] != undefined){
            a = rep.menu4a[cat][Number(msg)-1];
            prev.push("menu4a")
        }
        else if(msg == "*"){
            a = rep.menu4c;
            prev.pop();
        }
        else{
            return fallback;
        }
    }
    else if(prev[prev.length-1] === "menu4a")
    {
        if(msg == "*"){
            a = rep.menu4q[cat];
            prev.pop();
        }
        else{
            return fallback;
        }
    }
    //live project
    else if(prev[prev.length-1] === "menu5c")
    {
        if(rep.menu5q[Number(msg)-1] != undefined)
        {
            cat = Number(msg)-1;
            a = rep.menu5q[cat];
            prev.push("menu5q");
        }
        else if(msg == "*")
        {
            a = rep.optmenu;
            prev.pop();
            return a;
        }
        else{
            return fallback;
        }
    }
    else if(prev[prev.length-1] === "menu5q")
    {
        if(rep.menu5a[cat][Number(msg)-1] != undefined){
            a = rep.menu5a[cat][Number(msg)-1];
            prev.push("menu5a")
        }
        else if(msg == "*"){
            a = rep.menu5c;
            prev.pop();
        }
        else{
            return fallback;
        }
    }
    else if(prev[prev.length-1] === "menu5a")
    {
        if(msg == "*"){
            a = rep.menu5q[cat];
            prev.pop();
        }
        else{
            return fallback;
        }
    }
    else{
        return fallback;
    }
    console.log(prev)
    return a+"<br>Press * to view previous categories";
  }
app.post('/send-msg',(req,res)=>{
    res.send({Reply:resolve(req.body.MSG)});
});
app.listen(9000,function(req,res){
    console.log('Running at http://localhost:5000/');
});