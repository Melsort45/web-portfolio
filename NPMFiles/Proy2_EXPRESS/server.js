import express from 'express'
import axios from 'axios'
import {getWeatherFrom} from './services/meteo-service.js'

const app = express()
app.use (express.json()); //middleware

const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = []; 

app.get('/api/scientists', (req, res) => {
  const { dept } = req.query;
  if (dept){
    const result = scientists.filter((scientist) => scientist.department.toLowerCase() === dept.toLowerCase());
    
    if(result && result.length > 0){
        return res.json({ 
          deptScientists: result,
          dept,
          count: result.length
        });
    } else {
        return res.json({ errorMsg: `No results for department ${dept}`,dept });
    }
  }
  return res.json({ deptScientists: scientists, count: scientists.length });
})

app.get('/api/scientists/:id/profile/:keyword', (req, res) => {
  const scientistId = parseint(req.params.id, 10);
  const { keyword } = req.params;

  const scientist = scientists.find((scientist) => scientist.id === scientistId); 
  if (!scientist) {
    return res.json({ success: false, errorMsg: "No scientist found" });
  }
  res.json({ 
    success: true,
    data: scientist, 
    keyword,
  });

})

app.post('/api/initiatives', (req, res) => {
  const { title, budget, department } = req.body;
  const initiative = { title, budget, department };
  initiatives.push(initiative);
  res.json({title, budget, department, status: "OK"});
})

app.get('/api/initiatives', (req, res) => {
  res.json({initiatives, status: "OK"});
})

app.get('/weatherGDL', async (req, res) => {
  const respString = await getWeatherFrom(20.6597, -103.349, "Guadalajara");
  res.send(respString);
})

app.get('/weatherLSN', async (req, res) => {
  const respString = await getWeatherFrom(46.52, 6.63, "Lausanne");
  res.send(respString);
})

app.get('/', (req, res) => {  
  res.send('Hello World, aqui podemos poner el html...')
})

app.get('/about', (req, res) => {
  res.send('hola get jeje')
})

app.get('/greet', (req, res) => {
    const { name , city } = req.query
    res.send(`Hello, ${name} from ${city}!`)
    })

app.post('/about', (req, res) => {
  res.send('hola post jeje')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})