// Requires
const express = require('express')
const mongoose = require('mongoose')
const employeeRouter = require('./routes/employee')

let env
try {
	const tempEnv = require('./env.json')
	env = tempEnv.connString
}
catch {
	env = process.env.CONN_STRING
}

// Constants
const port = process.env.PORT || 3000

// Mutable vars
let app = express()


const connectFn = (callback) => {
	try {
		mongoose.connect(env).then(() => {
			console.log("Connected to Atlas")
			callback()
		})
	}
	catch (e) {
		console.error(e)
	}
}

connectFn(() => {
	app.listen(port)
	console.log("Started server")
})


app.get("/", (req, res) => {
	res.status(200).send("Welcome to my server!")
})

app.use("/api/v1/emp", employeeRouter)