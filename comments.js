// Create web server
const express = require('express');
const app = express();
// Set port
const port = 3000;
// Set view engine
app.set('view engine', 'ejs');
// Set path to views
app.set('views', './views');
// Set public folder
app.use(express.static('public'));
// Set body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// Set mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });
// Create Schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
// Create Model
const Comment = mongoose.model('Comment', commentSchema);
// GET
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { comments: comments });
        }
    });
});
// POST
app.post('/comment', (req, res) => {
    const name = req.body.name;
    const comment = req.body.comment;
    const newComment = new Comment({
        name: name,
        comment: comment
    });
    newComment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});