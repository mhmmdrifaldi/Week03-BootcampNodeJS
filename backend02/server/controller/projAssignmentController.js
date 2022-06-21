import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
	try {
		const projAssignment = await req.context.models.project_assignment.findAll()
		return res.send(projAssignment)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const findOne = async (req,res)=>{
	try {
		const projAssignment = await req.context.models.project_assignment.findOne({
			where:{pras_proj_id : req.params.id, pras_employee_id : req.params.id2}
		})
		return res.send(projAssignment)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const create = async (req,res)=>{
	try {
		const projAssignment = await req.context.models.project_assignment.create({
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

const update = async (req,res)=>{
	try {
		const projAssignment = await req.context.models.project_assignment.update({
			pras_startdate : req.body.pras_startdate,
			pras_enddate : req.body.pras_enddate,
			pras_status : req.body.pras_status
		},{ returning : true , where:{pras_proj_id : req.params.id, pras_employee_id : req.params.id2}})
		return res.send(projAssignment)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const deleted = async (req,res)=>{
	try {
			const projAssignment = await req.context.models.project_assignment.destroy({
					where:{pras_proj_id : req.params.id, pras_employee_id : req.params.id2}
			})
			return res.send('delete '+projAssignment+' rows')
	} catch (error) {
			return res.status(404).send(error)
	}
}

const querySQL = async(req,res)=>{
	try {
		await sequelize.query('INSERT INTO project_assignment VALUES(:pras_proj_id, :pras_employee_id, :pras_startdate, :pras_enddate, :pras_status)',
		{replacements : {pras_proj_id : req.body.pras_proj_id, pras_employee_id : req.body.pras_employee_id, pras_startdate : req.body.pras_startdate, pras_enddate : req.body.pras_enddate, pras_status : req.body.pras_status},type : sequelize.QueryTypes.INSERT})
		.then(result =>{
			return res.send(result)
		})
	} catch (error) {
		return res.status(404).send(error)
	}
}

export default {
	findAll,
	findOne,
	create,
	update,
	deleted,
	querySQL
}