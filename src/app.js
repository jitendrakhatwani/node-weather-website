const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const e = require("express");

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname,'../public'));

const app = express();

const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Set up handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Jitendra'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Jitendra'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Jitendra',
        message:'This is help page created for documentation'
    })
})

// app.get('',(req,res)=>{
//      res.send('<h1>Weather</h1>');
//  })
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Jitendra',
//         age:'36'
//     }, {
//         name: 'Mayank',
//         age: 36
//     }
//     ]);
// })
//
// app.get('/about',(req,res)=>{
//     res.send('<title>About Page</title><h1>Title: About Page</h1>');
// })

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please enter a valid address'
        })
    }
    geocode(req.query.address,(error,{lat,lng,location} ={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(lat,lng,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location:forecastData.location,
                address:req.query.address,
                currentTemperature:forecastData.currentTemperature
            })


        })
    })
})

app.get('/help/*',(req,res)=>{
   res.render('404',{
       title:'404',
       errorMessage:'Help Article not found',
       name:'Jitendra'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'404-Page not found',
        name:'Jitendra'


    })
})

app.listen(port, ()=>{
    console.log('Server is up on port 3000');
});