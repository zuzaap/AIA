const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoClient = require('mongodb').MongoClient
const router = require('./router')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json())

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}: ${new Date()}`)
    next();
})

const url = 'mongodb://127.0.0.1:27017'
const dbname = 'products'

app.listen(3000,()=>{
    console.log("Server is running - port 3000");
});

app.use(session({secret: "Shh, its a secret!", resave: false,  saveUninitialized: true}));

app.use('/', router)

app.use(express.static('public'))


mongoClient.connect(url, {poolSize : 10}, (error, client) => {
    if(error)
        console.log('Cannot connect to database')

    const db = client.db(dbname)
    db.collection('albums').insertMany(
            [
                {
                    title : 'Violator',
                    artist : 'Depeche_Mode',
                    year: '1990',
                    price: '29.99'
                },
                {
                    title: 'Kid_A',
                    artist: 'Radiohead',
                    year: '2000',
                    price: '35.99'
                },
                {
                    title: 'Remind_Me_Tomorrow',
                    artist: 'Sharon_van_Etten',
                    year: '2017',
                    price: '19.99'
                },
                {
                    title: 'Honeymoon',
                    artist: 'Lana_del_Rey',
                    year: '2015',
                    price: '29.99'
                },
                {
                    title: 'Murder_Ballads',
                    artist: 'Nick_Cave_&_The_Bad_Seeds',
                    year: '1990',
                    price: '40.99'
                },
                {
                    title: 'Is_this_desire?',
                    artist: 'PJ_Harvey',
                    year: '1998',
                    price: '34.99'
                },
                {
                    title: 'Arctic_Monkeys',
                    artist: 'Tranquility_Base_Hotel_&_Casino',
                    year: '2018',
                    price: '22.99'
                },
                {
                    title: 'The_Last_Shadow_Puppets',
                    artist: 'The_Age_Of_The_Understatement',
                    year: '2008',
                    price: '27.99'
                },
                {
                    title:"David_Bowie",
                    artist: 'Blackstar',
                    year: '2016',
                    price: '39.99'
                }
            ], (error, result) => {
                if(error)
                    console.log('Cannot insert elements')
                console.log(result.ops)
            })
    console.log('Connected to database!')
    client.close()
})

module.exports = express