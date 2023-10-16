const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({

	first_name: {
		type: String,
		required: [true, "First name is required"],
		maxLength: 100
	},

	last_name: {
		type: String,
		required: [true, "Last name is required"],
		maxLength: 50
	},

	email: {
		type: String,
		required: [true, "Email address is required"],
		maxLength: 50,
		validate: {
			validator: async (v) => {
				if (await Employee.exists({email: v}).exec()) {
					return false;
				}
				return true;
			}
		}
	},

	gender: {
		type: String,
		enum: {
			values: ['Male', 'Female', 'Other'],
			message: '{VALUE} not supported'
		},
		maxLength: 25
	},

	salary: {
		type: Number,
		min: 1,
		required: [true, "Salary is required"]
	}

})

const Employee = mongoose.model('Employee', employeeSchema)

