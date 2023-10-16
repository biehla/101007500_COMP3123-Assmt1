// Requires
const express = require('express')

// Imports

// Constants
const port = process.env.PORT || 8085

// Mutable vars
let app = express()

app.get("/", (req, res) => {
	res.status(200).send("Welcome to my server!")
})

app.listen(port)