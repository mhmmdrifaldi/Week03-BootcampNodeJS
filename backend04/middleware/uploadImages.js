import formidable from 'formidable'
import fs from 'fs'

const uploadDir = process.cwd() + '/backend04/storages/' // Menentukan tempat hasil upload

const uploadFiles = async (req,res,next) => {
	const options = {
		keepExtensions : true, // Agar file yang tidak sesuai dengan yang kita pilih akan menjadi error
		uploadDir : uploadDir, // Mengecek tempat penyimpanan
		maxFileSize : 5 * 1024 * 1024 // 5Mb
	}

	const form = formidable(options) // Membuat form menggunaka module formidable dengan ketentuan yang ada pada options

	let fields = []
	let files = []

	form.onPart = function (part) {
		if (!part.originalFilename || part.originalFilename.match(/\.(jpg|jpeg|png)$/i)) {
			this._handlePart(part)
		} else {
			return res.status(404).send('File type is not supported')
		}
	}

	form.parse(req)
		.on('field', (filename, value)=>{
			fields.push({filename, value})
		})
		.on('file', (fieladname, file)=>{
			files.push({fieladname, file})
		})
		.once('end', ()=>{
			console.log('Uplodad Done')
			req.fileAttribute = ({
				files : files,
				fields : fields
			})
			next()
		})
}

const showFile = async(req,res) => {
	const filename = req.params.filename
	const url = `${process.cwd()}/backend04/storages/${filename}`
	fs.createReadStream(url)
		.on('error', ()=>responseNotFound(req,res))
		.pipe(res)
}

function responseNotFound(req,res) {
	res.writeHead(404, {'Content-Type' : 'text/plain'})
	res.end('Not Found')
}

export default {
	uploadFiles,
	showFile
}