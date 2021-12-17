const express = require('express')
const { json } = require('express')
const app = express()
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const chalk = require('chalk')
const forecast = require('./utils/forecast')

const path = require('path')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const ViewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(path.join(__dirname, '../public')))

//setup handlebar and views location
app.set('views', ViewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


//the commented lines below wont run as we have set default location in the code above
// app.get('', (req,res)=>{
//     res.send('<H1>Hello express</H1>')
// })


app.get('',(req, res) =>{
    res.render('index',{
        title: 'Home Page',
        name: 'Roshan',
        pageHeader: 'Home Page from Partials'
    })
})

app.get('/about', (req,res)=>{
    // res.send(JSON.stringify( {
    //     name: 'Roshan',
    //     age: 37,
    //     country: 'Nepal'
    // }))
    res.render('about', {
        name: 'Roshan',
        age: 37,
        location: 'Nepal' ,
        pageHeader: 'About Page from partials'
    })

})


app.get('/help',(req, res)=>{
    res.render('help', {
        title: 'Help',
        pageHeader: 'Help!',
        message: 'No such page exists'
    })
})

app.get('/weather', (req, res) =>{
//    res.send('weather here')
    if (req.query.address == undefined)
    {
        res.send({
            error: 'Please provide address'
        })
    }
    else
    {
        // res.send({
        //     forecast: 'Raining',
        //     address: req.query.address
        // })
        geoCode(req.query.address, (error, {place, longitude, latitude} = {}) => {
            if (error)
            {
                res.send({
                    error: 'Sorry, could not find location'
                })
            }
            else{
             console.log(chalk.bgGreen.red('Location: ' + place))
             forecast(longitude + ',' + latitude, (error, data) =>{
                 if (error)
                 {
                    res.send({
                        error: 'Sorry, could not find location'
                    })
                 }
                 else
                 {
                    //  console.log(chalk.bgYellow.green('Weather Condition: ' + data.condition))
                    //  console.log('It is currently ' + data.temperature +  ' degrees temperature. It feels like ' + data.feelsLike + ' degrees out')
                    res.send({
                        forecast: 'It is currently ' + data.temperature +  ' degrees temperature. It feels like ' + data.feelsLike + ' degrees out',
                        location: place,
                        address: req.query.address
                    })
                 
                 }
             })
            }
         })
         
    }
})



app.get('*',(req,res)=>{
    res.render('404', {
        pageHeader: 'Oops!',
        message: 'No such page exists'
    })
})


app.listen(3000, ()=>{
    console.log('Server is listening at port: 3000')
})