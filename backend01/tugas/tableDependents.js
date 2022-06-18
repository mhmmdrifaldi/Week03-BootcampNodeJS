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

app.get('/api/dependent',(req,res) => {
	pool.query('select * from dependents',
	[],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.get('/api/dependent/:id',(req,res) => {
	const {id} = req.params
	pool.query('select * from dependents where dependent_id = $1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.post('/api/dependent/',(req,res)=>{
	const {id, f_name, l_name, relationship, e_id} = req.body
	pool.query('insert into dependents(dependent_id, first_name, last_name, relationship, employee_id) values ($1,$2,$3,$4,$5)',
	[id, f_name, l_name, relationship, e_id],
	(error,result)=>{
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.put('/api/dependent/:id', (req,res) => {
	const {id} = req.params
	const {f_name, l_name, relationship, e_id} = req.body
	pool.query('update dependents set first_name=$1, last_name=$2, relationship=$3, employee_id=$4 where dependent_id=$5',
	[f_name, l_name, relationship, e_id, id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.delete('/api/dependent/:id', (req,res) => {
	const {id} = req.params
	pool.query('delete from dependents where dependent_id=$1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})