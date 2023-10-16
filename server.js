// Requires
const express = require('express')
const mongoose = require('mongoose')
const parser = require('body-parser')
const employeeRouter = require('./routes/employee')
const userRouter = require('./routes/users')

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

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

const connectFn = async () => {
	try {
		await mongoose.connect(env)	
		console.log("Connected to Atlas")
	}
	catch (e) {
		console.error(e)
	}
}

connectFn()
app.listen(port)
console.log(`Started server on ${port}`)

app.get("/", (req, res) => {
	res.status(200).send("Welcome to my server!")
})

app.use("/api/v1/emp", employeeRouter)
app.use("/api/v1/user", userRouter)