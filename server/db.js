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
  compDays: Number,
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

module.exports.delete = (req, res) => {
  Goal.deleteOne({_id: req.query.idx})
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports.put = (req, res) => {
  if (req.body.goalUpdates.increase) {
    Goal.findOneAndUpdate({_id: req.body.goalUpdates.id}, {compDays: req.body.goalUpdates.currGoalNum + 1}, {new: true})
      .then(() => {
        res.sendStatus(200);
    })
      .catch((err) => {
        console.error(err);
    });
  } else if (!req.body.goalUpdates.increase && req.body.goalUpdates.currGoalNum > 0) {
    Goal.findOneAndUpdate({_id: req.body.goalUpdates.id}, {compDays: req.body.goalUpdates.currGoalNum - 1}, {new: true})
      .then(() => {
        res.sendStatus(200);
    })
      .catch((err) => {
        console.error(err);
    });
  } else {
    res.sendStatus(200)
  }
};

// Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
  // Updated at most one doc, `res.modifiedCount` contains the number
  // of docs that MongoDB updated
// });
