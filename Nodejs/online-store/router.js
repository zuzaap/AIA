const express = require('express')
const router = express.Router()
var MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"
const dbname = 'products'
var ObjectID = require('mongodb').ObjectID



router.use((req, res, next) => {
    if(req.session.basket == undefined) {
        req.session.basket = []
    }
    next()
})


router.get('/', function (req, res) {
    if(!req.session.basket){
        req.session.basket = []
    }
    mylog = 'Welcome to music store, choose album which you would like to buy'
    MongoClient.connect(url, {poolSize: 10}, function(err, client) {
        if (err) throw err
        var db = client.db(dbname)
        db.collection('albums').find().toArray(function(req, result){
            if (err) throw err
            res.render(
                'mainView', {'albums': result, 'logs': mylog}
            )
        })
        client.close()
    })
})

router.get('/shoppingCart', function(req, res){
    if(!req.session.basket){
        req.session.basket = []
    }
    res.render(

        'shoppingCart', {'albums' : req.session.basket}
        
    )
    console.log('youre in basket!')
})

router.post('/addToBasket', function(req, res){
    console.log(req.body)
    
    var album = {
        _id : req.body.albumID,
        title : req.body.albumTitle,
        artist : req.body.albumArtist,
        year : req.body.albumYear,
        price : req.body.albumPrice        
    }

    var inBasket = false

    if(!req.session.basket){
        req.session.basket = []
    }

    for(element in req.session.basket){
        if(album._id == req.session.basket[element]._id){
            inBasket = true
            break
        }else{
            inBasket = false
        }
    }

    if(!inBasket){
        req.session.basket.push(album)
        console.log('product added')
    }else{
        console.log('This album is already in your basket')
    }

    res.redirect("/")

})

router.post('/deleteFromBasket', function(req, res){

    var album = {
        id : req.body.albumID,
        title : req.body.albumTitle,
        artist : req.body.albumArtist,
        year : req.body.albumYear,
        price : req.body.albumPrice        
    }

    for(element in req.session.basket){
        if(req.session.basket[element]._id == album.id){
            req.session.basket.splice(element, 1)
        }          
    }

    res.redirect('/shoppingCart')

})

router.get('/finalize', function(req, res){

    if ( req.session.basket.length == 0 ){
        console.log('Your basket is empty, you have nothing to buy')
        res.redirect('/')
    } else {
       list = []
        for (element in req.session.basket){
            list.push(req.session.basket[element]._id)
        }
        req.session.basket = []
        MongoClient.connect(url, {poolSize: 10}, function(err, client) {
            if (err) throw err
            var db = client.db(dbname)
            db.collection('albums').find().toArray(function(req, result){
                if (err) throw err
                for(element in list){
                    id = list[element]
                    console.log(id)
                     db.collection('albums').deleteOne( 
                         {id: ObjectID } ,                  
                         (err, collection) => {
                         if (err) throw err;
                         if ( collection.result.n == 0){
                             console.log('cant delete elements')
                         } else if (collection.result.n == 1){
                             console.log('deleted successfully')
                         }
                     })
                }                
            })
            res.redirect('/')
        })

    }
})

router.get('/cancel', function(req, res){

    req.session.basket = []
    console.log('purchase cancelled, your basket is empty')
    res.redirect('/')

})

module.exports = router