const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
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


        app.get('/bikeCategories', async (req, res) => {
            const query = {}
            const result = await bikeCategories.find(query).toArray()
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