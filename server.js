const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://rohitomar:rohitomar@cluster0.oi8dpes.mongodb.net/blogDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.log('Error connecting to MongoDB Atlas:', error);
});

// Define the interview details schema
const interviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
//   date: { type: Date, required: true },
  status: { type: String, required: true },
  phone: { type: String, required: true }
});

// Create the interview details model
const Interview = mongoose.model('Interview', interviewSchema);

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
})
// Define a route to handle form submissions
app.post('/interview-details', (req, res) => {
  const interview = new Interview({
    name: req.body.name,
    email: req.body.email,
    company: req.body.company,
    // date: req.body.date,
    status: req.body.status,
    phone: req.body.phone
  });

  interview.save().then(() => {
    console.log('Interview details saved to MongoDB Atlas');
    res.send('Interview details saved successfully');
  }).catch((error) => {
    console.log('Error saving interview details to MongoDB Atlas:', error);
    res.status(500).send('Error saving interview details to MongoDB Atlas');
  });
});

app.get('/interviews', (req, res) => {
  Interview.find().then((interviews) => {
    res.render('interviews', { interviews: interviews });
  }).catch((error) => {
    console.log('Error fetching interview details from MongoDB Atlas:', error);
    res.status(500).send('Error fetching interview details from MongoDB Atlas');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
