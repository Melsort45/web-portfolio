const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'html'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let names = [];
let tasks = [];

app.get('/', (req, res) => {
  res.render('index', { names, tasks, error: req.query.error });
});

app.get('/greet', (req, res) => {
  const { name } = req.query;
  if (name) {
    console.log("Name received:", name);
    names.push(name);
  }
  res.redirect('/');
});

app.get('/wazzup/:id', (req, res, next) => {
  const index = parseInt(req.params.id, 10);

 
  if (isNaN(index) || index < 0 || index >= names.length) {
    const err = new Error('Index out of range');
    return next(err);
  }

  res.render('wazzup', { name: names[index] });
});

app.put('/greet/:name', (req, res) => {
  const { name } = req.params;
  if (name) {
    names.push(name);
  }
  res.json({ names });
});

app.get('/task', (req, res) => {
  res.json({ tasks });
});

app.post('/task', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
  }
  res.redirect('/');
});

app.get('/task/delete/:id', (req, res) => {
  const index = parseInt(req.params.id, 10);
  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.redirect('/');
});

app.delete('/task', (req, res) => {
  const { index } = req.body;
  if (index !== undefined && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    return res.json({ message: 'Task deleted', tasks });
  }
  res.status(400).json({ error: 'Invalid index' });
});

app.get('/task/move/:direction/:id', (req, res) => {
  const index = parseInt(req.params.id, 10);
  const { direction } = req.params;

  if (direction === 'up' && index > 0) {
    const temp = tasks[index];
    tasks[index] = tasks[index - 1];
    tasks[index - 1] = temp;
  } else if (direction === 'down' && index < tasks.length - 1) {
    const temp = tasks[index];
    tasks[index] = tasks[index + 1];
    tasks[index + 1] = temp;
  }

  res.redirect('/');
});

app.use((err, req, res, next) => {
  console.error("Error handler caught:", err.message);
  res.redirect(`/?error=${encodeURIComponent(err.message)}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});