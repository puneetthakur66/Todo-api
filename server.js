var express = require('express');
var app  = express();
var PORT = process.env.PORT || 3006;
var todos = [{
	id: 1,
	description: "Talk to mom every day",
	completed: false
},{
	id: 2,
	description: "Eat eggs every day",
	completed: false
},{
	id: 3,
	description: "this is a test request",
	completed: true
}];

app.get('/', function (req, res) {
	res.send('To do API Root');
});

app.get('/todos', function (req, res) {
	res.json(todos);
});

app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;

	todos.forEach( function (todo) {
		if (todoId === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else{
		res.status(404).send();
	}

});
app.listen(PORT, function () {
	console.log('Express listening on port: '+ PORT);
});