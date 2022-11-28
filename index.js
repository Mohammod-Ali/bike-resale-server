const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

//midle ware
app.use(cors())
app.use(express.json())

// mongodb
async function run() {
    try{

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