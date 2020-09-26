require('./db/mongoose');
const express = require('express');
const Blog = require('./models/blog');

const app = express();
app.use(express.json());

app.post('/blogs', async (req, res) => {
    const blog = new Blog(req.body);
    try {
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404);
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.patch('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!blog) {
            return res.status(404).send();
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(3000, (req, res) => {
    console.log('app is running in port 3000!');
})