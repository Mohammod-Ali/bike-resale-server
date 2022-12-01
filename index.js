const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())

// mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7haskyh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try{

        const bikeCollections = client.db('bikeResale').collection('bikeCollections')
        const bikeCategories = client.db('bikeResale').collection('categories')
        const usersCollections = client.db('bikeResale').collection('users')
        const bookingsCollections = client.db('bikeResale').collection('bookings')


        app.get('/bikeCategories', async (req, res) => {
            const query = {}
            const result = await bikeCategories.find(query).toArray()
            res.send(result)
        })

        // load bike dada from db
        app.get('/bikeCollections', async(req, res) => {
            const query = {}
            const result = await bikeCollections.find(query).toArray()
            res.send(result)
        })
        
        // send bike data to db from client side
        app.post('/bikeCollections', async(req, res) => {
            const bikes = req.body
            const result = await bikeCollections.insertOne(bikes)
            res.send(result)
        })

        // save the users data
        app.post('/users', async(req, res) => {
            const user = req.body;
            const result = await usersCollections.insertOne(user)
            res.send(result)
        })

        //check the admin from db
        app.get('/users/admin/:email', async( req, res ) => {
            const email = req.params.email
            const query = { email }
            const user = await usersCollections.findOne(query)
            res.send({isAdmin: user?.category === 'admin'})
        })

        //check the seller role from db
        app.get('/users/seller/:email', async( req, res ) => {
            const email = req.params.email
            const query = { email }
            const user = await usersCollections.findOne(query)
            res.send({isSeller: user?.category === 'seller'})
        })
        
        // save the bookings data
        app.post('/bookings', async(req, res) => {
            const booking = req.body;
            const result = await bookingsCollections.insertOne(booking)
            res.send(result)
        })

        //get booking data from db
        app.get('/bookings', async(req, res) => {
            const email = req.query.email
            const query = { email: email}
            const result = await bookingsCollections.find(query).toArray()
            res.send(result)
        })

        // app.get('/bikeCategory/:id', (req, res) => {
        //     const bikeCategory = req.params.id
        //     console.log(bikeCategory)
        // })
    }
    finally{

    }
}

run().catch(err => console.log(err))


app.get('/', async(req, res) => {
    res.send('Bike Resale server is running')
})
app.listen(port, () => {
    console.log(`Bike resale server running on ${port}`)
})