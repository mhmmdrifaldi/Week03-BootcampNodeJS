import dotenv from "dotenv"
import express, {response} from "express"
dotenv.config() //Menyambungkan dengan file .env melalui module dotenv

const app = express()
const port = process.env.PORT || 3003

app.listen(port,()=>console.log(`Server listening on port `+ port)) //Menampilkan kalimat yang diinginkan
app.get('/', responseText) //Menampilkan data dalam bentuk Text
app.get('/json', responseJson) //Menampilkan data dalam bentuk JSON
app.use('*', responseNotFound) //Menampilkan respon error

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