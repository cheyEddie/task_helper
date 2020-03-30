let mysql = require('mysql')
let connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Eddiesherwind98",
	database: 'to_do_app'
})
connection.connect()
 module.exports = connection