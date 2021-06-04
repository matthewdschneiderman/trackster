var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/trackster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected!!');
});

const goalSchema = new mongoose.Schema({
  goal: String,
  days: Number,
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports.post = (req, res) => {
  console.log('helololo', req.body);
  const createGoal = new Goal(req.body);
  createGoal
    .save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports.get = (req, res) => {
  Goal.find({})
    .then((goals) => {
      res.status(200).send(goals);
    })
    .catch((err) => {
      console.error(err);
    });
};
