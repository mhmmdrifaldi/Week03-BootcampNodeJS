const findAll = async (req,res)=>{
  try {
    const region = await req.context.models.regions.findAll({
      include : [{
        // Menampilkan keseluruhan relasi yang bersangkutan
        // all : true
        // Memilih table relasi yang ingin ditampilkan
        model : req.context.models.countries,
        as : "countries",
        // Digunakan untuk membuat inner join jika dijadikan false maka akan menjadi left outer join
        required : true
        // Digunakan untuk membuat right outer join
        // right : true
      }]
    })
    return res.send(region)
  } catch (error) {
    return res.status(404).send(error)
  }
}

const createNext = async (req,res,next)=>{
  try {
    const region = await req.context.models.regions.create({
      region_name : req.body.region_name
    })
    req.regions = region
    next()
  } catch (error) {
    return res.status(404).send(error)
  }
}

export default {
  findAll,
  createNext,
}