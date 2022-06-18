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

app.get('/api/country',(req,res) => {
	pool.query('select * from countries',
	[],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.get('/api/country/:id',(req,res) => {
	const {id} = req.params
	pool.query('select * from countries where country_id = $1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.post('/api/country/',(req,res)=>{
	const {id, name, r_id} = req.body
	pool.query('insert into countries(country_id, country_name, region_id) values ($1,$2,$3)',
	[id, name, r_id],
	(error,result)=>{
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.put('/api/country/:id', (req,res) => {
	const {id} = req.params
	const {name, r_id} = req.body
	pool.query('update countries set country_name=$1, region_id=$2 where country_id=$3',
	[name, r_id, id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.delete('/api/country/:id', (req,res) => {
	const {id} = req.params
	pool.query('delete from countries where country_id=$1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})