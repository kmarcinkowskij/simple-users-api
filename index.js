require('dotenv').config()

const express = require('express')
const PORT = 3000

const app = express()

const mongoose = require('mongoose')

const url = process.env.DATABASE_URL


const connectionParams={
	useNewUrlParser: true,
	useUnifiedTopology: true
}
mongoose.set('strictQuery', false)
mongoose.connect(url,connectionParams)
	.then( ()=> {
		console.log("Connected to MongoDB")
	})

	.catch( error => {
        console.error(`Error while connecting to database ${error}`)
    })

// app.listen(
// 	PORT,
// 	() => console.log(`API listening on http://localhost:${PORT}`)
// 	)

app.listen(PORT, function(error){
	if(error) throw error
	console.log(`API listening on http://localhost:${PORT}`)
})

app.use(express.json())

const restRouter = require('./routes/rest');
app.use('/rest', restRouter)


