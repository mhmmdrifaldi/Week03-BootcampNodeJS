import dotenv from "dotenv"
import express, {response} from "express"
dotenv.config()

const app = express()
const port = process.env.PORT || 3003

app.listen(port,()=>console.log(`Server listening on port `+ port))
app.get('/', responseText)
app.get('/json', responseJson)
app.use('*', responseNotFound)

function responseText(req, res) {
	res.setHeader('Content-Type','text/plain')
	res.end('Hello Muhammad Rifaldi')
}

function responseJson(req, res) {
	res.json(
		{
			employee:{
				empId : 100,
				firstName : "Muhammad",
				lastName : "Rifaldi"
			}
		}
	)
}

function responseNotFound(req,res) {
	res.writeHead(404, {'Content-Type': 'text/plain'})
	res.end('Page Not Found')
}