import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
  try {
	  const project = await req.context.models.projects.findAll()
    return res.send(project)
  } catch (error) {
    return res.status(404).send(error)
  }
}

const findOne = async (req,res)=>{
  try {
    const project = await req.context.models.projects.findOne({
      where:{proj_id : req.params.id}
    })
    return res.send(project)
  } catch (error) {
  	return res.status(404).send(error)
  }
}

const create = async (req,res)=>{
  try {
    const project = await req.context.models.projects.create({
      proj_name : req.body.proj_name,
			proj_createdon : req.body.proj_createdon,
			proj_duedate : req.body.proj_duedate,
			proj_cust_name : req.body.proj_cust_name,
			proj_description : req.body.proj_description,
			proj_status : req.body.proj_status,
			proj_amount : req.body.proj_amount,
			proj_account_mgr : req.body.proj_account_mgr,
			employee_id : req.body.employee_id
    })
    return res.send(project)
  } catch (error) {
    return res.status(404).send(error)
  }
}

const update = async (req,res)=>{
  try {
    const project = await req.context.models.projects.update({
      proj_name : req.body.proj_name,
			proj_createdon : req.body.proj_createdon,
			proj_duedate : req.body.proj_duedate,
			proj_cust_name : req.body.proj_cust_name,
			proj_description : req.body.proj_description,
			proj_status : req.body.proj_status,
			proj_amount : req.body.proj_amount,
			proj_account_mgr : req.body.proj_account_mgr,
			employee_id : req.body.employee_id
    },{ returning : true , where:{proj_id : req.params.id}})
      return res.send(project)
    } catch (error) {
      return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
  try {
    const project = await req.context.models.projects.destroy({
      where:{proj_id : req.params.id}
    })
    return res.send('delete '+project+' rows')
  } catch (error) {
    return res.status(404).send(error)
  }
}

const querySQL = async(req,res)=>{
  try {
    await sequelize.query('SELECT e.employee_id, e.first_name, p.proj_name, p.proj_createdon, p.proj_duedate, p.proj_cust_name, p.proj_status FROM employees e JOIN projects p ON e.employee_id = p.employee_id WHERE p.proj_id = :proj_id',
    {replacements : {proj_id : req.params.id},type : sequelize.QueryTypes.SELECT})
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