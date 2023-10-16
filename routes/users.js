// Requires
const express = require('express')
const User = require('../models/users')
const bcrypt = require('bcrypt')

// Constants
const router = express.Router()

router.post('/signup', async (req, res) => {
	let hashedPassword
	bcrypt.hash(req.body.password, 10, async(err, hash) => {
		const user = {
			username: req.body.username,
			email: req.body.email,
			password: hash,
		}
		try {
			const newUser = await User.create(user)
			await newUser.save()
			res.status(201).send()
		}
		catch (e) {
			res.status(500).send(e)
		}
	})
})

router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username }).exec()
		bcrypt.compare(req.body.password, user.get('password', String), (err, result) => {
			if (result) {
				res.status(200).send()
			}
			else {
				res.status(401).json({ error: "Password is invalid" })
			}
		})
	}
	catch (e) {
		res.status(500).send(e)
	}
})

module.exports = router