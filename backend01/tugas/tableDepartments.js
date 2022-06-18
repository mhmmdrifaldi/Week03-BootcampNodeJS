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

app.get('/api/department',(req,res) => {
	pool.query('select * from departments',
	[],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.get('/api/department/:id',(req,res) => {
	const {id} = req.params
	pool.query('select * from departments where department_id = $1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.post('/api/department/',(req,res)=>{
	const {id, name, l_id} = req.body
	pool.query('insert into departments(department_id, department_name, location_id) values ($1,$2,$3)',
	[id, name, l_id],
	(error,result)=>{
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.put('/api/department/:id', (req,res) => {
	const {id} = req.params
	const {name, l_id} = req.body
	pool.query('update departments set department_name=$1, location_id=$2 where department_id=$3',
	[name, l_id, id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.delete('/api/department/:id', (req,res) => {
	const {id} = req.params
	pool.query('delete from departments where department_id=$1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})