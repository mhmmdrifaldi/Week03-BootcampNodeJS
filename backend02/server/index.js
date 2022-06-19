import 'dotenv/config'
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import models,{sequelize} from "./models/init-models";
import routes from './routes/index'

const port = process.env.PORT || 3000;
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(helmet())
app.use(compress())
app.use(cors())
app.use(async(req,res,next)=> {
    req.context = {models}
    next()
})

app.use('/region', routes.regionRoutes)
app.use('/country', routes.countryRoutes)
app.use('/location', routes.locationRoutes)
app.use('/department', routes.departmentRoutes)
app.use('/employee', routes.employeeRoutes)
app.use('/job', routes.jobRoutes)
app.use('/dependent', routes.dependentRoutes)
app.use('/project', routes.projectRoutes)
app.use('/projAssign', routes.projAssignmentRoutes)

const dropDatabaseSync = false

sequelize.sync({force : dropDatabaseSync}).then(async()=>{
    if (dropDatabaseSync) {
        console.log("Database do not drop");
    }
    app.listen(port,()=>{console.log('Server is listening on port '+port)})
})

export default app