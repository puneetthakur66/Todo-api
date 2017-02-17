var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app  = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var nextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('To do API Root');
});

app.get('/todos', function (req, res) {
	res.json(todos);
});

app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	// var matchedTodo;

	// todos.forEach( function (todo) {
	// 	if (todoId === todo.id) {
	// 		matchedTodo = todo;
	// 	}
	// });

	if (matchedTodo) {
		res.json(matchedTodo);
	} else{
		res.status(404).send();
	}

});

app.post('/todos', function (req, res) {
	var body = req.body;
	body = _.pick(body, 'description', 'completed');
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
		return res.status(400).send();
	}
	body.id = nextId;
	body.description = body.description.trim();
	todos.push(body);
	nextId++;
	console.log('body data: ' + body);
	res.json(todos);
});


app.listen(PORT, function () {
	console.log('Express listening on port: '+ PORT);
});