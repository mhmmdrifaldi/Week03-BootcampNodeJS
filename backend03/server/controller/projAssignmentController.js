const findAll = async (req,res)=>{
	try {
		const projAssignment = await req.context.models.project_assignment.findAll({
			include : [{
				all : true,
				right : true
			}]
		})
		return res.send(projAssignment)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const create = async (req,res)=>{
	try {
		const projAssignment = await req.context.models.project_assignment.create({
			pras_proj_id : req.body.pras_proj_id,
			pras_employee_id : req.body.pras_employee_id,
			pras_startdate : req.body.pras_startdate,
			pras_enddate : req.body.pras_enddate,
			pras_status : req.body.pras_status
		})
		return res.send(projAssignment)
	} catch (error) {
		return res.status(404).send(error)
	}
}

export default {
	findAll,
	create,
}