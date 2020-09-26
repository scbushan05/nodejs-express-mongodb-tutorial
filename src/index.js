require('./db/mongoose');
const express = require('express');
const Blog = require('./models/blog');

const app = express();
app.use(express.json());

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((blog) => {
        res.status(201).send(blog);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.get('/blogs', (req, res) => {
    Blog.find({}).then((blogs) => {
        res.send(blogs);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id).then((blog) => {
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.patch('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((blog) => {
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    }).catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id).then(blog => {
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    }).catch(error => {
        res.status(500).send(error);
    })
})

app.listen(3000, (req, res) => {
    console.log('app is running in port 3000!');
})