const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

const mongoURI = 'mongodb://127.0.0.1:27017/f1_database';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  name: String,
  lname: String,
  dob: String,
  nation: String,
  url: String,
  team: String
});

const Driver = mongoose.model('Driver', driverSchema);

app.set('views', path.join(__dirname, 'public', 'html'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function loadCsvMiddleware(req, res, next) {
  try {
    const count = await Driver.countDocuments();
    if (count === 0) {
      console.log('Database empty. Importing f1_2023.csv...');
      const csvFilePath = path.join(__dirname, 'public', 'data', 'f1_2023.csv');
      const driversToInsert = [];

      if (fs.existsSync(csvFilePath)) {
        fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on('data', (row) => {
            driversToInsert.push({
              num: parseInt(row.number) || 0,
              code: row.code,
              name: row.forename,
              lname: row.surname,
              dob: row.dob,
              nation: row.nationality,
              url: row.url,
              team: row.current_team
            });
          })
          .on('end', async () => {
            await Driver.insertMany(driversToInsert);
            console.log('CSV data successfully imported to MongoDB.');
            next();
          });
      } else {
        console.warn('CSV file not found at:', csvFilePath);
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.error('Error in loadCsvMiddleware:', error);
    next();
  }
}

app.get('/', loadCsvMiddleware, async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ num: 1 });
    const viewMode = req.query.view || 'drivers'; 

    
    const nationalities = [...new Set(drivers.map(d => d.nation).filter(Boolean))].sort();
    const teams = [...new Set(drivers.map(d => d.team).filter(Boolean))].sort();

    res.render('index', {
      drivers,
      nationalities,
      teams,
      currentView: viewMode
    });
  } catch (error) {
    res.status(500).send('Error loading page: ' + error.message);
  }
});

app.post('/driver', async (req, res) => {
  try {
    const { num, code, name, lname, dob, url, nation, team } = req.body;
    await Driver.create({ num, code, name, lname, dob, url, nation, team });
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error creating driver: ' + error.message);
  }
});

app.post('/driver/update/:id', async (req, res) => {
  try {
    const { num, code, name, lname, dob, nation, team } = req.body;
    await Driver.findByIdAndUpdate(req.params.id, {
      num, code, name, lname, dob, nation, team
    });
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error updating driver: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});