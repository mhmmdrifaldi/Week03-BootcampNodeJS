const findAll = async (req,res)=>{
	try {
		const job = await req.context.models.jobs.findAll({
			include : [{
				all : true
			}]
		})
		return res.send(job)
	} catch (error) {
		return res.status(404).send(error)
	}
}

const createNext = async (req,res,next)=>{
	try {
		const job = await req.context.models.jobs.create({
			job_title : req.body.job_title,
			min_salary : req.body.min_salary,
			max_salary : req.body.max_salary
		})
		req.jobs = job
		next()
	} catch (error) {
		return res.status(404).send(error)
	}
}

export default {
	findAll,
	createNext,
}