let connection = require('../config/db')
let moment = require('moment')
moment.locale('fr')
class Todos {
    constructor(row) {
        this.row = row
    }

/**
 * CRUD methods
 */    
    static findAll(cb) {
        connection.query('SELECT * FROM todos', (err, rows) => {
            if (err) throw err
            cb(rows.map((row => new Todos(row))))
        })
    }
    static find(id,cb) {
        connection.query('SELECT *FROM todos WHERE id=?',[id], (err,row) =>{
            if (err) throw err 
            cb(new Todos(row[0]))
         })
    }
    static create(title,begining_date,end_date) {
        connection.query('INSERT INTO todos (title,begining_date,end_date) VALUES (?,?,?)',[title,begining_date,end_date])
    }
    static update(id,title,content) {
        db.run('UPDATE notes SET title=?,content=?,updated_at=? WHERE id=?',[title,content,now,id])
    }
    static delete(id) {
        connection.query('DELETE FROM todos WHERE id=?',[id])
    }
    static setProgressValue(progressValue,id) {
        connection.query('UPDATE todos SET progress=? WHERE id=?',[progressValue,id])
    }

    /**
    * Getters
    */  
    get id () {
        return this.row.id
    }
    get title () {
        return this.row.title
    }
    get begining_date () {
        return moment(this.row.begining_date)
    }
    get end_date () {
        return moment(this.row.end_date)
    }
    get progress () {
        return this.row.progress
    }
}

module.exports = Todos