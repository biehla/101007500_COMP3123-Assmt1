// Requires
const express = require('express')
const env = require('./env.json')
const mongoose = require('mongoose')
const employeeRouter = require('./routes/employee')

// Constants
const port = process.env.PORT || 3000

// Mutable vars
let app = express()


const connectFn = async () => {
	try {
		await mongoose.connect(env.connString)	
		console.log("Connected to Atlas")
	}
	catch (e) {
		console.error(e)
	}
}

app.listen(port)
console.log("Started server")
connectFn()

app.get("/", (req, res) => {
	res.status(200).send("Welcome to my server!")
})

app.use("/api/v1/emp", employeeRouter.router)