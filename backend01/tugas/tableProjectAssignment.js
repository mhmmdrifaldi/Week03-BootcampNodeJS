import dotenv from "dotenv"
import express from "express"
dotenv.config()

const Pool = require('pg').Pool
const pool = new Pool({
	host : "localhost",
	user : "postgres",
	password : "admin",
	database : "HR",
	port : 5432
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 3003
app.listen(port, ()=>{console.log('Server listening on port '+ port)})

app.get('/api/projassign',(req,res) => {
	pool.query('select * from project_assignment',
	[],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.get('/api/projassign/:id',(req,res) => {
	const {id} = req.params
	pool.query('select * from project_assignment where pras_proj_id = $1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.get('/api/projassign/:idP/:idE',(req,res) => {
	const {idP, idE} = req.params
	pool.query('select * from project_assignment where pras_proj_id = $1 and pras_employee_id = $2',
	[idP, idE],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.post('/api/projassign/',(req,res)=>{
	const {p_id, e_id, startdate, enddate, status} = req.body
	pool.query('insert into project_assignment(pras_proj_id, pras_employee_id, pras_startdate, pras_enddate, pras_status) values ($1,$2,$3,$4,$5)',
	[p_id, e_id, startdate, enddate, status],
	(error,result)=>{
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.put('/api/projassign/:idP/:idE', (req,res) => {
	const {idP, idE} = req.params
	const {startdate, enddate, status} = req.body
	pool.query('update project_assignment set pras_startdate=$1, pras_enddate=$2, pras_status=$3 where pras_proj_id=$4 and pras_employee_id=$5',
	[startdate, enddate, status, idP, idE],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.delete('/api/projassign/:idP/:idE', (req,res) => {
	const {idP, idE} = req.params
	pool.query('delete from project_assignment where pras_proj_id=$1 and pras_employee_id=$2',
	[idP, idE],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})