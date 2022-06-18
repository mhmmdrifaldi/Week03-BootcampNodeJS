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

app.get('/api/employee',(req,res) => {
	pool.query('select * from employees',
	[],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.get('/api/employee/:id',(req,res) => {
	const {id} = req.params
	pool.query('select * from employees where employee_id = $1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.post('/api/employee/',(req,res)=>{
	const {id, f_name, l_name, email, phone, lahir, j_id, salary, m_id, d_id} = req.body
	pool.query('insert into employees(employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, manager_id, department_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
	[id, f_name, l_name, email, phone, lahir, j_id, salary, m_id, d_id],
	(error,result)=>{
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.put('/api/employee/:id', (req,res) => {
	const {id} = req.params
	const {f_name, l_name, email, phone, lahir, j_id, salary, m_id, d_id} = req.body
	pool.query('update employees set first_name=$1, last_name=$2, email=$3, phone_number=$4, hire_date=$5, job_id=$6, salary=$7, manager_id=$8, department_id=$9 where employee_id=$10',
	[f_name, l_name, email, phone, lahir, j_id, salary, m_id, d_id, id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.delete('/api/employee/:id', (req,res) => {
	const {id} = req.params
	pool.query('delete from employees where employee_id=$1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})