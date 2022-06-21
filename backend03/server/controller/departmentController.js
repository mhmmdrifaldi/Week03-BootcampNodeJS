const findAll = async (req,res)=>{
	try {
		const department = await req.context.models.departments.findAll({
			include : [{
				model : req.context.models.employees,
				as : "employees",
				right : true
			}]
		})
		return res.send(department)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const create = async (req,res)=>{
	const cekLocation = req.location
	try {
		const department = await req.context.models.departments.create({
			department_name : req.body.department_name,
			location_id : cekLocation.location_id
		})
		return res.send(department)
	} catch (error) {
		return res.status(404).send(error)
	}
}

export default {
	findAll,
	create,
}