let connection = require('../config/db')
let moment = require('moment')
class Steps {
    constructor(row) {
        this.row = row
    }

/**
 * CRUD methods
 */    
    static findAll(cb) {
        connection.query('SELECT * FROM steps', (err, rows) => {
            if (err) throw err
            cb(rows.map((row => new Steps(row))))
        })
    }
    static find(id,cb) {
        db.all('SELECT *FROM notes WHERE id=?',[id], (err,row) =>{
            if (err) throw err 
            cb(new Notes(row[0]))
         })
    }
    static create(content,list_id) {
        connection.query('INSERT INTO steps (content,list_id) VALUES (?,?)',[content,list_id])
    }
    static update(id,title,content) {
        db.run('UPDATE notes SET title=?,content=?,updated_at=? WHERE id=?',[title,content,now,id])
    }
    static delete(id) {
        connection.query('DELETE FROM steps WHERE id=?',[id])
    }
    static findBylistId(list_id,cb) {
        connection.query('SELECT *FROM steps WHERE list_id=?',[list_id], (err,rows) =>{
            if (err) throw err 
            cb(rows.map((row => new Steps(row))))
         })
    }
    static reinitialize(list_id) {
        connection.query('UPDATE steps SET done=0 WHERE list_id=?',[list_id])
    }
    static setDone(id) {
        connection.query('UPDATE steps SET done=1 WHERE id=?',[id])
    }
    static getProgressValue (list_id,cb) {
        connection.query('SELECT * FROM steps WHERE list_id=?',[list_id], (err,rowsTotal)=> {
            if (err) throw err
            connection.query('SELECT * FROM steps WHERE list_id=? AND done=?',[list_id,1], (err,rowsDone)=> {
                let progressValue = (rowsDone.length*100)/rowsTotal.length
                cb(parseInt(progressValue))
            })
        })
    }
    static deleteByListId (list_id) {
        connection.query('DELETE FROM steps WHERE list_id=?',[list_id])
    }
    /**
    * Getters
    */  
    get id () {
        return this.row.id
    }
    get content () {
        return this.row.content
    }
    get done () {
        return this.row.done
    }
    get list_id () {
        return this.row.list_id
    }
}

module.exports = Steps