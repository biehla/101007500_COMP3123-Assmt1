// Requires
const express = require('express')
const Employee = require('../models/employee')

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
	const emp = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		gender: req.body.gender,
		salary: req.body.salary
	}

	try {
		const employee = await Employee.create(emp)
		await employee.save()
		res.status(201).send()
	}
	catch (e) {
		res.status(500).send(e)
	}
})

router.get('/employees/:id', async (req, res) => {
	try {
		const employees = await Employee.findById(req.params.id)
		res.status(200).send(employees)
	}
	catch (e) {
		res.status(500).send(e)
	}
})

router.put('/employees/:id', async (req, res) => {
	console.log("HAIIIII")
	if (!Employee.findById(req.params.id)) {
		res.status(500).send({
			error: "Please provide an ID"
		})
	}

	const emp = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		gender: req.body.gender,
		salary: req.body.salary
	}
	
	try {
		const employee = await Employee.findByIdAndUpdate(req.params.id, emp)
		await employee.save()
		res.status(201).send()
	}
	catch (e) {
		res.status(500).send(e)
	}
})

router.delete('/employees', async (req, res) => {
	const id = req.query.eid
	try {
		await Employee.findByIdAndDelete(id).exec()
		res.status(200).send()
	}
	catch (e) {
		res.status(500).send(e)
	}
})

module.exports = router