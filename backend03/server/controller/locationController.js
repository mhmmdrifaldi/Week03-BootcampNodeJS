const findAll = async (req,res)=>{
  try {
	  const location = await req.context.models.locations.findAll({
      include : [{
        model : req.context.models.departments,
        as : "departments",
      }]
    })
    return res.send(location)
  } catch (error) {
    return res.status(404).send(error)
  }
}
const createNext = async (req,res,next)=>{
  try {
    const location = await req.context.models.locations.create({
      location_id : req.body.location_id,
      street_address : req.body.street_address,
			postal_code : req.body.postal_code,
			city : req.body.city,
			state_province : req.body.state_province,
			country_id : req.body.country_id
    })
    req.location = location
    next()
  } catch (error) {
    return res.status(404).send(error)
  }
}
export default {
  findAll,
  createNext,
}