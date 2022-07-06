// Mendeklarasikan penghubung dengan database
const config = {
	env : process.env.NODE_ENV || 'dev',
	port : 3001,
	db_name : 'HR',
	db_username : 'postgres',
	db_password : 'admin'
}
export default config