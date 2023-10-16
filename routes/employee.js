// Requires
const express = require('express')

// Exports
export {router}

// Imports
import Employee from '../models/employee'

// Constants
const router = express.Router()

// Mutable vars


router.get('/employees', async (req, res) => {
	try {
		const employees = await Employee.find({})
		res.status(200).send(employees)
	}
	catch (e) {
		res.status(500).send(e)
	}
})

router.post('/employees', async (req, res) => {

})

router.get('/employees/:id', async (req, res) => {

})

router.post('/employees/:id', async (req, res) => {
	
})

router.delete('/employees', async (req, res) => {

})

