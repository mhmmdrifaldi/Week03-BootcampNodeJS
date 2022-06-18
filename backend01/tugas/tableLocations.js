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

app.get('/api/location',(req,res) => {
	pool.query('select * from locations',
	[],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.get('/api/location/:id',(req,res) => {
	const {id} = req.params
	pool.query('select * from locations where location_id = $1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rows)
	})
})

app.post('/api/location/',(req,res)=>{
	const {id, address, postal, city, province, c_id} = req.body
	pool.query('insert into locations(location_id, street_address, postal_code, city, state_province, country_id) values ($1,$2,$3,$4,$5,$6)',
	[id, address, postal, city, province, c_id],
	(error,result)=>{
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.put('/api/location/:id', (req,res) => {
	const {id} = req.params
	const {address, postal, city, province, c_id} = req.body
	pool.query('update locations set street_address=$1, postal_code=$2, city=$3, state_province=$4, country_id=$5 where location_id=$6',
	[address, postal, city, province, c_id, id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})

app.delete('/api/location/:id', (req,res) => {
	const {id} = req.params
	pool.query('delete from locations where location_id=$1',
	[id],
	(error,result) => {
		if(error) {
			throw error
		}
		res.status(200).json(result.rowCount)
	})
})