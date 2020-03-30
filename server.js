// Requires
let express = require('express')
let bodyParser = require('body-parser')
let session = require('express-session')
let app = express()
let todos = require('./models/todos')
let steps = require('./models/steps')
//View
app.set('view engine', 'ejs')

//Static files
//Css and js files
app.use('/assets/js', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/assets/js', express.static(__dirname + '/node_modules/popper.js/dist'))
app.use('/assets/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/assets/js', express.static(__dirname + '/public/assets/fontawesome/js'))
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/assets/css', express.static(__dirname + '/public/assets/fontawesome/css'))
app.use(express.static('public'))

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes en get
app.get('/', (req,res)=> {
	todos.findAll((todos) =>{
	res.render('pages/home',{page_title:"Home",todos: todos}) 
   })
})
app.get('/todos/create', (req,res)=> {
   res.render('pages/create_todo',{page_title:"New to do"})
})
app.get('/todos/view/:id', (req,res) => {
   let id = req.params.id
   todos.find(id,(todo) => {
   		steps.findBylistId(id, (steps)=> {
   			res.render('pages/view_todo', {page_title:"View",todo:todo,steps:steps})
   		})
   })
})
app.get('/changedone/:step_id/:todo_id', (req,res)=> {
   let step_id = req.params.step_id
   let todo_id = req.params.todo_id
   steps.setDone(step_id)
   steps.getProgressValue(todo_id, (pvalue)=>{
      todos.setProgressValue(pvalue,todo_id)
   })
   res.redirect('/todos/view/'+todo_id)
})
app.get('/reinitializesteps/:list_id', (req,res)=> {
   let list_id = req.params.list_id
   steps.reinitialize(list_id)
   todos.setProgressValue(0,list_id)
   res.redirect('/todos/view/'+list_id)
})
//Routes en post
app.post('/todos/create', (req,res)=> {
   todos.create(req.body.title,req.body.begining_date,req.body.end_date)
   res.redirect('/')
})
app.post('/todos/view/:id', (req,res)=> {
   steps.create(req.body.content,req.body.list_id)
   steps.getProgressValue(req.body.list_id, (pvalue)=>{
      todos.setProgressValue(pvalue,req.body.list_id)
   })
   res.redirect('/todos/view/'+req.body.list_id)
})
app.post('/deletetodo', (req,res)=> {
   steps.deleteByListId(req.body.list_id)
   todos.delete(req.body.list_id)
   res.status(200).end()
})
app.post('/deletesteps', (req,res)=> {
   steps.delete(req.body.step_id)
   steps.getProgressValue(req.body.list_id, (pvalue)=>{
      todos.setProgressValue(pvalue,req.body.list_id)
   })
   res.status(200).end()
})
app.listen(8080,function(){
	console.log('Server started on port 8080')
})