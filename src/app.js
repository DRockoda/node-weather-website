const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'Weather app',
        name:'Abhay'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Abhay'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide a address term'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{

    if(!req,query.search){
        res.send({
            error:'you must provide a search term'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Abhay',
        message:'They fear death,They should fear something more than death'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error',
        name:'Abhay',
        message:'Oops!! somethings not right'
    })
})



app.listen(port, () => {
    console.log('Server is up on port '+ port)
})