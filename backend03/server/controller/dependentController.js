const findAll = async (req,res)=>{
	try {
		const dependent = await req.context.models.dependents.findAll({
			include : [{
				all : true,
				right : true
			}]
		})
		return res.send(dependent)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const create = async (req,res,next)=>{
	const cekEmployees = req.employees
	try {
		const dependent = await req.context.models.dependents.create({
			first_name : req.body.first_name1,
			last_name : req.body.last_name1,
			relationship : req.body.relationship,
			employee_id : cekEmployees.employee_id
		})
		req.dependents = dependent
		next()
	} catch (error) {
		return res.status(404).send(error)
	}
}

export default {
	findAll,
	create,
}