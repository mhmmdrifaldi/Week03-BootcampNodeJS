const findAll = async (req,res)=>{
	try {
		const employee = await req.context.models.employees.findAll({
			include : [
				{
					model : req.context.models.projects,
					as : "projects",
					required : true
				},
				{
					model : req.context.models.dependents,
					as : "dependents",
					required : true
				}
			]
		})
		return res.send(employee)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const create = async (req,res,next)=>{
	const cekJobs = req.jobs
	try {
		const employee = await req.context.models.employees.create({
			employee_id : req.body.employee_id,
			first_name : req.body.first_name,
			last_name : req.body.last_name,
			email : req.body.email,
			phone_number : req.body.phone_number,
			hire_date : req.body.hire_date,
			job_id : cekJobs.job_id,
			salary : req.body.salary,
			manager_id : req.body.manager_id,
			department_id : req.body.department_id
		})
		req.employees = employee
		next()
	} catch (error) {
		return res.status(404).send(error)
	}
}

export default {
	findAll,
	create,
}