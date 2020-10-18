const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
const router = require('./controller/router/router')
app.use(bodyParser.json())
app.use(express.static(__dirname + '/build'));

const start = async () => {
    app.listen(port, () => console.log("Server has been started"))
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
})
app.post('/api/addBook',router)
app.put('/api/takeBook', router)
app.post('/api/addBooks/:number', router)
app.delete('/api/deleteBook/:id', router)
app.post('/api/addReader', router)
app.get('/api/finder', router)
app.get('/api/getFreeTitles', router)
app.get('/api/getReaders', router)
app.get('/api/getWriters', router)
app.get('/api/getBooks', router)

start()


