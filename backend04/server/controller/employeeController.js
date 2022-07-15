const findAll = async (req,res)=>{
	try {
		const employee = await req.context.models.employees.findAll()
		return res.send(employee)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const findOne = async (req,res)=>{
	try {
		const employee = await req.context.models.employees.findOne({
			where:{employee_id : req.params.id}
		})
		return res.send(employee)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const create = async (req,res)=>{
	const {files, fields} = req.fileAttribute
	try {
		const employee = await req.context.models.employees.create({
			first_name : fields[0].value,
			last_name : fields[1].value,
			email : fields[2].value,
			phone_number : fields[3].value,
			// hire_date : new Date(), Untuk menggunakan tanggal sekarang tanpa harus memasukkan inputan
			hire_date : fields[4].value,
			job_id : fields[5].value, // parseInt digunakan untuk merubah string menjadi integer
			salary : fields[6].value,
			manager_id : fields[7].value,
			department_id : fields[8].value,
			emp_profile : files[0].file.newFilename
		})
		return res.send(employee)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const update = async (req,res)=>{
	let {files, fields} = req.fileAttribute
	try {
		const employee = await req.context.models.employees.update({
			first_name : fields[0].value,
			last_name : fields[1].value,
			email : fields[2].value,
			phone_number : fields[3].value,
			hire_date : fields[4].value,
			job_id : fields[5].value,
			salary : fields[6].value,
			manager_id : fields[7].value,
			department_id : fields[8].value,
			emp_profile : files[0].file.newFilename
		},{ returning : true , where:{employee_id : req.params.id}})
		return res.send(employee)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const deleted = async (req,res)=>{
	try {
		const employee = await req.context.models.employees.destroy({
			where:{employee_id : req.params.id}
		})
		return res.send('delete '+employee+' rows')
	} catch (error) {
		return res.status(404).send(error)
	}
}

export default {
	findAll,
	findOne,
	create,
	update,
	deleted
}