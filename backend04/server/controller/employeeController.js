const create = async (req,res)=>{
	const {files, fields} = req.fileAttribute
	try {
		const employee = await req.context.models.employees.create({
			employee_id : parseInt(fields[0].value),
			first_name : fields[1].value,
			last_name : fields[2].value,
			email : fields[3].value,
			phone_number : fields[4].value,
			// hire_date : new Date(), Untuk menggunakan tanggal sekarang tanpa harus memasukkan inputan
			hire_date : fields[5].value,
			job_id : parseInt(fields[6].value), // parseInt digunakan untuk merubah string menjadi integer
			salary : fields[7].value,
			manager_id : parseInt(fields[8].value),
			department_id : parseInt(fields[9].value),
			emp_profile : files[0].file.newFilename
		})
		return res.send(create)
	} catch (error) {
		return res.status(404).send(error)
	}
}

export default {
	create
}