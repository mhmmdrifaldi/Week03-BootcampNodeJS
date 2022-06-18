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

app.get('/api/project',(req,res) => {
	pool.query('select * from projects',
	[],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.get('/api/project/:id',(req,res) => {
	const {id} = req.params
	pool.query('select * from projects where proj_id = $1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.post('/api/project/',(req,res)=>{
	const {id, name, create, due, cust, desc, status, amount, mgr, e_id} = req.body
	pool.query('insert into projects(proj_id, proj_name, proj_createdon, due_date, proj_cust_name, proj_description, proj_status, proj_amount, proj_account_mgr, employee_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
	[id, name, create, due, cust, desc, status, amount, mgr, e_id],
	(error,result)=>{
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.put('/api/project/:id', (req,res) => {
	const {id} = req.params
	const {name, create, due, cust, desc, status, amount, mgr, e_id} = req.body
	pool.query('update projects set proj_name=$1, proj_createdon=$2, due_date=$3, proj_cust_name=$4, proj_description=$5, proj_status=$6, proj_amount=$7, proj_account_mgr=$8, employee_id=$9 where proj_id=$10',
	[name, create, due, cust, desc, status, amount, mgr, e_id, id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.delete('/api/project/:id', (req,res) => {
	const {id} = req.params
	pool.query('delete from projects where proj_id=$1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})