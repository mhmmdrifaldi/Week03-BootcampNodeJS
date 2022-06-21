const findAll = async (req,res)=>{
  try {
	  const project = await req.context.models.projects.findAll({
      include : [{
        all : true,
        required : true
      }]
    })
    return res.send(project)
  } catch (error) {
    return res.status(404).send(error)
  }
}

const create = async (req,res)=>{
  const cekEmployees = req.employees
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
			employee_id : cekEmployees.employee_id
    })
    return res.send(project)
  } catch (error) {
    return res.status(404).send(error)
  }
}

export default {
  findAll,
  create,
}